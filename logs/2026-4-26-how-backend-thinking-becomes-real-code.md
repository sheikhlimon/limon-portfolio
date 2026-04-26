---
title: "How Backend Thinking Becomes Real Code"
date: 26 Apr 2026
year: 2026
type: blog
tags: ["backend"]
---

In the previous post, the idea was simple: think in terms of resource, action, and logic.

That works well when you are designing APIs. But once you start writing actual backend code, you need structure. Without it, everything ends up in one place and quickly becomes hard to manage.

The same thinking still applies. It just takes a different form in code.

Instead of resource, action, and logic, you start seeing layers:

- Route
- Controller
- Service
- Data

At first this looks like a new concept, but it is just the same model expressed in code.

## Route

A route represents the entry point. It connects a URL and an HTTP method to your system. When a request comes in, the route decides where it should go.

```js
router.post("/api/bookings", bookingController.create)
```

That is it. The route does nothing else. It just maps a URL to a function.

## Controller

A controller sits right after the route. It handles the request and response. This is where you deal with input, basic validation, and shaping the output. It should stay thin and not contain heavy logic.

```js
async function create(req, res) {
  const { flightId, userId } = req.body

  if (!flightId || !userId) {
    return res.status(400).json({ error: "Missing required fields" })
  }

  const booking = await bookingService.create({ flightId, userId })
  res.status(201).json(booking)
}
```

Notice how the controller does not know anything about flights or availability. It just checks that the input exists and passes it along.

## Service

The service is where the real work happens. All business rules live here. This is where you check conditions, perform calculations, and decide what should happen.

```js
async function create({ flightId, userId }) {
  const flight = await flightRepo.findById(flightId)
  if (!flight) throw new Error("Flight not found")

  if (flight.seatsAvailable < 1) throw new Error("No seats available")

  return bookingRepo.create({ flightId, userId, status: "confirmed" })
}
```

This is the logic layer. It does not care about HTTP requests or responses. It only cares about the rules.

## Data layer

The data layer is where information is stored or fetched. This could be a database or an external API. The service talks to this layer when it needs data.

```js
async function create(data) {
  return db.query("INSERT INTO bookings SET ?", data)
}
```

Simple and focused. It only knows how to talk to the database.

## How it all connects

If you connect this back to the earlier model, the mapping becomes clear:

- Resource becomes the route
- Action becomes the HTTP method
- Validation happens in the controller
- Business logic lives in the service
- Data is handled by the database or external APIs

A request flows through all four layers. The route receives it, the controller validates input, the service applies logic, and the data layer handles storage. The result flows back the same way.

Each layer has one responsibility. The route directs traffic, the controller handles input and output, the service contains the rules, and the data layer handles storage.

This separation is what keeps systems manageable. If booking rules change, you only touch the service. If input format changes, you only touch the controller. You are not digging through one large function trying to understand everything at once.

Once you start structuring your code this way, the original mental model becomes practical. You are not just thinking in abstractions anymore, you are building systems that can grow without breaking.
