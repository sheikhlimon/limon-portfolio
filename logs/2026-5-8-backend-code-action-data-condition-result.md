---
title: "Most Backend Code Is Just: Action, Data, Condition, Result"
date: 8 May 2026
year: 2026
type: blog
tags: ["backend"]
---

This is part 3 of a series on reading backend code. [Start from part 1](/posts/2026-4-26-how-backend-engineers-actually-think).

---

When I first looked at real backend code, it felt impossible to read.

Something like this:

```ts
await prisma.session.update({
  where: { id: sessionId },
  data: { status: "paused", pauses },
})
```

looked like alien language.

Too many braces. Too many dots. Too many nested things.

But after slowing down and reading enough code, I realized something important:

Most backend code is actually built from just 4 ideas:

- Action
- Data
- Condition
- Result

Once I started seeing code this way, everything became easier to read.

## 1. Action

An action is simply: "Do something."

Usually this is a function call.

```ts
pauseSession()
```

or:

```ts
prisma.task.update()
```

These are actions. They tell the program to perform work.

### Real example

```ts
await prisma.task.update({
  where: { id: taskId },
  data: { status: "active" },
})
```

The action is `update()`. Everything else is just information for the action.

## 2. Data

Data is the information we pass around. Usually it looks like objects:

```ts
{
  status: "active"
}
```

or arrays:

```ts
;["apple", "banana"]
```

Backend code passes data everywhere.

### Example

```ts
data: {
  status: "paused"
}
```

This just means: here is the data to save.

### Important realization

Most scary-looking backend code is actually just nested data.

```ts
{
  where: {
    id: sessionId
  },
  data: {
    status: "paused"
  }
}
```

This is just an object inside another object. Nothing magical.

## 3. Condition

Conditions control decisions.

```ts
if (lastPause && !lastPause.end)
```

At first this looks confusing. But in English it means:

If `lastPause` exists AND it does not have an end time.

That's all.

### Most backend logic is conditions

```ts
if (user)
```

```ts
if (!token)
```

```ts
if (session.status === "paused")
```

These are just decisions.

## 4. Result

Every action usually produces a result.

```ts
const session = await prisma.session.findUnique(...)
```

The result is stored in `session`.

So the flow becomes:

1. Do action
2. Get result
3. Use result

## The big shift in understanding

Beginners often try to read code symbol by symbol. Like this:

- what does this brace mean
- what does this dot mean
- what does this parenthesis mean

Experienced developers don't read code that way. They chunk it into meaning.

```ts
await prisma.session.update(...)
```

instantly becomes: "database update"

And:

```ts
if (!user)
```

becomes: "check if user exists"

That pattern recognition is what makes code feel readable.

## The real problem isn't syntax

Most of the time, the syntax itself is simple. The real difficulty is nested structures.

```ts
await prisma.session.update({
  where: { id: sessionId },
  data: { status: "paused", pauses },
})
```

This combines:

- function call
- object
- nested object
- variable shorthand
- async waiting

all at once.

That's why it feels overwhelming.

## A trick that helps

Take complicated code and rewrite it in smaller pieces.

Instead of:

```ts
return prisma.session.update({
  where: { id: sessionId },
  data: { status: "running", pauses },
})
```

rewrite mentally as:

```ts
const whereData = {
  id: sessionId,
}

const updateData = {
  status: "running",
  pauses: pauses,
}

return prisma.session.update({
  where: whereData,
  data: updateData,
})
```

Now the structure becomes obvious.

## Backend code is repetition

After enough exposure, you realize most backend apps repeat the same patterns forever:

1. Receive data
2. Check condition
3. Perform action
4. Return result

That's basically the entire architecture of many APIs.

## Final thought

The moment code became less scary for me was when I stopped seeing giant blocks of syntax and started seeing:

- Action
- Data
- Condition
- Result

Once you recognize those four things, most backend code becomes much easier to follow.
