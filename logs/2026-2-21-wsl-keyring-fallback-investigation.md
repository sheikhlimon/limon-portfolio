---
title: 'WSL Keyring Fallback: Investigation into Cross-Platform Secret Storage'
date: 21 Feb 2026
year: 2026
---

## Project Context

[Goose](https://github.com/block/goose) is an open-source AI agent that supports multiple LLM providers including GitHub Copilot via OAuth authentication. The application uses system keyring storage for API tokens, with automatic fallback to file-based storage when keyring is unavailable.

## The Problem

A WSL user reported that GitHub Copilot OAuth configuration showed an error message: `Failed to save token: Secret stored using file-based fallback`, even though:

- The token was successfully saved to `~/.config/goose/secrets.yaml`
- Goose ran correctly after the "error"
- The fix from PR [#7177](https://github.com/block/goose/pull/7177) (v1.24.0) should have prevented this error

### Expected Behavior:

- Keyring unavailable → Fallback to file storage → Return success
- No error shown to user

### Actual Behavior:

- Keyring unavailable → Fallback to file storage → Error still shown

## Root Cause Analysis

### The Fix That Should Work

PR #7177 added graceful fallback handling in `base.rs`:

```rust
match self.handle_keyring_operation(
    |entry| entry.set_password(&json_value),
    service,
    Some(&values),
) {
    Ok(_) => {}
    Err(ConfigError::FallbackToFileStorage) => {}  // Treat as success
    Err(e) => return Err(e),
}
```

This should catch `FallbackToFileStorage` and return `Ok(())`, preventing the error from propagating.

### Architectural Constraints Identified

1. **Config Singleton Pattern**: The `Config` object is created once at startup with `SecretStorage::Keyring` or `SecretStorage::File` based on `GOOSE_DISABLE_KEYRING` env var. When fallback sets this env var at runtime, the Config's internal state doesn't change.

2. **Dual Error Handling Paths**:
   - `configure.rs` uses `try_store_secret()` which correctly handles `FallbackToFileStorage`
   - `githubcopilot.rs` calls `set_secret()` directly with `.map_err()`, converting all errors to `ProviderError::ExecutionError`

3. **WSL Environment Parity**: WSL handles inter-process communication (IPC) for keyrings differently than native Linux. If dbus or gnome-keyring services are present but unreachable (Windows side running but WSL can't connect), the error returned might not match expected patterns. Could be `IOError` or `ConnectionRefused` that bypasses `is_keyring_availability_error()` detection.

### The Error Flow

```
handle_keyring_fallback_error() writes to file successfully
  ↓
Returns Err(ConfigError::FallbackToFileStorage)
  ↓
set_secret() match should catch this and return Ok(())
  ↓
But error still propagates to githubcopilot.rs:566
  ↓
Converted to ProviderError::ExecutionError
  ↓
Displayed to user
```

## Investigation Status

**Unable to reproduce locally.** The code inspection shows the fix should work, but user reports (v1.25.0) show the error still appears.

### Possible Causes:

1. WSL-specific error path not covered by pattern matching
2. Different error type being returned that looks like `FallbackToFileStorage`
3. Compilation/deployment mismatch
4. Error being logged before the match can catch it

## Next Steps

1. **Debug Logging**: User to run `RUST_LOG=debug goose configure` to capture actual error flow
2. **Expand Error Patterns**: Add WSL-specific error patterns to `is_keyring_availability_error()`
3. **Per-Provider Handling**: Consider if `githubcopilot.rs` needs its own `FallbackToFileStorage` handling instead of relying on `map_err()`

## Why This Matters

The graceful fallback should work universally across all providers without per-provider changes. Finding why it doesn't would:

- Improve UX for all WSL users
- Prevent duplicate error handling code
- Ensure consistent behavior across different environments

## Lessons Learned

1. **Environment Matters**: WSL is not quite Linux. IPC, file systems, and process isolation behave differently enough to break assumptions.

2. **Leaky Abstractions**: The `ConfigError::FallbackToFileStorage` abstraction leaks when different parts of the codebase handle errors differently.

3. **Testing Gap**: The fallback path works in theory but may have untested edge cases in cross-platform scenarios.

4. **Error Display ≠ Failure**: The operation actually succeeded (token saved), but the error message suggests otherwise. This is a UX issue masking a success.
