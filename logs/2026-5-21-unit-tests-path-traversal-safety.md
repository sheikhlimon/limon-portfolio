---
title: "Unit Tests for Path Traversal Safety in _serve_frontend"
date: 21 May 2026
year: 2026
type: log
tags: ["security"]
---

# The Problem

Tahrir's `add_frontend_view` function serves frontend files through a catch-all route `/<path:path>`. The `path` parameter comes from user-controlled URL input, which makes it a path traversal vector. If the underlying implementation used `os.path.join` instead of Werkzeug's `safe_join`, attackers could request paths like `/etc/passwd` or `../../../etc/passwd` and leak arbitrary files from the host.

The implementation was simplified (per review on PR #966) to rely on `send_from_directory`, which internally uses `safe_join` to reject paths that escape the frontend directory. But the function had no tests — issue #967 was filed to add them.

---

# What Is Path Traversal?

The frontend directory is a boundary. Only files inside it should be served. Path traversal is escaping that boundary — requesting a file outside it.

There are three ways to do this:

- **Absolute path** (`/etc/passwd`): Ignores the directory entirely. `os.path.join("/my-dir", "/etc/passwd")` returns `/etc/passwd` — the directory prefix is discarded.
- **Relative traversal** (`../../../etc/passwd`): Each `..` climbs up one directory level, eventually escaping the boundary.
- **URL-encoded** (`%2e%2e`): The same as `..` but disguised. `%2e` is `.` in URL encoding. Some string-level checks block `".."` but let `"%2e%2e"` through, which gets decoded later by the framework.

All three do the same thing — reach outside the allowed directory. They just use different techniques.

`send_from_directory` blocks all three by calling `safe_join`, which returns `None` when the resolved path escapes the base directory.

---

# What the Tests Cover

**Happy path** — serving a real static file that exists:

```python
def test_serve_existing_static_file(app):
    response = client.get("/styles.css")
    assert b"margin" in response.data
```

**SPA fallback** — unknown routes serve `index.html` (how single-page apps work):

```python
def test_unknown_path_serves_index(app):
    response = client.get("/some/spa/route")
    assert b"index" in response.data
```

**Traversal vectors** (parametrized — same assertion, multiple inputs):

- `/etc/passwd` — absolute path
- `/../../../etc/passwd` — relative traversal
- `/%2e%2e/%2e%2e/etc/passwd` — URL-encoded traversal

Each asserts both a positive check (SPA fallback works, `b"index" in response.data`) and a negative check (sensitive content not leaked, `b"root:" not in response.data`).

---

# Why Both Positive and Negative Assertions?

A positive assertion (`b"index" in response.data`) confirms the fallback works. A negative assertion (`b"root:" not in response.data`) confirms no sensitive file content leaked. Without the negative, if the response happened to contain both `index.html` content and `/etc/passwd` content, the positive assertion alone would still pass.

---

# Why Parametrize?

Three separate test functions with identical bodies, differing only in the input URL. `@pytest.mark.parametrize` runs one test function against multiple inputs — same logic, no repetition, easier to add more vectors later.

---

# Why Fixture-Generated Files?

The fixture creates `styles.css` inside the frontend dir and `secret.txt` outside it (in the parent directory). The `secret.txt` file enables a deterministic assertion (`b"top-secret" not in response.data`) that doesn't depend on `/etc/passwd` existing on the test machine. The `styles.css` file tests the happy path — that real static files are served correctly, not just the fallback.

---

# Key Patterns

- **Fixtures are cascading setup functions** linked by argument names. `tmp_path` (built-in) → `frontend_dir` (creates files) → `app` (wires Flask routes). Each test only declares what it needs.
- **`send_from_directory` with `safe_join` is the security boundary.** The tests document that it works, not fix it.
- **Parametrized traversal tests** prove the full request pipeline (Flask routing + Werkzeug decoding + `safe_join`) handles absolute, relative, and encoded vectors.
