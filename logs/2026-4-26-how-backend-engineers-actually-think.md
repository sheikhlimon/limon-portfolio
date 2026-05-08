---
title: "How Backend Engineers Actually Think"
date: 26 Apr 2026
year: 2026
type: blog
tags: ["backend"]
---

When I started learning backend development, things felt scattered. Endpoints, routes, controllers all looked like separate pieces without a clear system behind them.

At some point it clicked that backend code is not random. There is a simple way of thinking that keeps everything consistent.

It comes down to three things:

- Resource
- Action
- Logic

## Resource

A resource is the thing your system deals with.

In a travel app, for example:

- Users
- Flights
- Bookings
- Payments

These are your core entities. If you can name it as a noun, it is probably a resource.

## Action

Once you know the resource, the next question is what you can do with it.

Instead of inventing custom operations, everything maps to HTTP methods:

- GET → read
- POST → create
- PUT or PATCH → update
- DELETE → remove

### Example: Users

- `POST /api/users` → create account
- `GET /api/users/me` → get current user
- `PUT /api/users/me` → update profile
- `DELETE /api/users/me` → delete account

### Example: Bookings

- `POST /api/bookings` → create booking
- `GET /api/bookings` → list bookings
- `GET /api/bookings/:id` → get one booking
- `DELETE /api/bookings/:id` → cancel booking

The key idea is consistency. You are not inventing endpoints every time, you are following a pattern.

## Logic

This is where the real work happens.

You decide what must be true before something is allowed to happen.

### Example: Create booking

- User must be authenticated
- Flight must exist
- Seats must be available
- Price must be calculated

Then:

- Save the booking
- Return the result

The endpoint is just the entry point. The logic is what actually defines the system.

## How it all fits together

Every feature follows the same flow:

- Identify the resource
- Choose the endpoint and HTTP method
- Validate input
- Apply business logic
- Return a response

### Example: Flight search

- Resource: flights
- Method: GET
- Endpoint: `/api/flights?from=DAC&to=DXB`

Flow:

- Validate input
- Fetch matching flights
- Format results
- Return response

### Example: Payments

- Resource: payments
- Method: POST
- Endpoint: `/api/payments`

Flow:

- Check booking exists
- Calculate amount
- Call payment service
- Verify result
- Update booking

## Closing thought

Once you start thinking in terms of resource, action, and logic, backend development becomes predictable.

You stop guessing what to build and start structuring it.

And when things are structured, they become much easier to design, extend, and maintain.

**Next**: [How Backend Thinking Becomes Real Code](/posts/2026-4-26-how-backend-thinking-becomes-real-code) — how this mental model translates into actual code layers.
