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

At first this looks like a completely new concept, but it is not. It is just your original model translated into code.

A route represents the entry point. It connects a URL and an HTTP method to your system. When a request comes in, the route decides where it should go.

A controller sits right after the route. It handles the request and response. This is where you deal with input, basic validation, and shaping the output. It should stay thin and not contain heavy logic.

The service is where the real work happens. All business rules live here. This is where you check conditions, perform calculations, and decide what should happen.

The data layer is where information is stored or fetched. This could be a database or an external API. The service talks to this layer when it needs data.

If you connect this back to the earlier model, the mapping becomes clear:

- Resource becomes the route
- Action becomes the HTTP method
- Validation happens in the controller
- Business logic lives in the service
- Data is handled by the database or external APIs

Seeing this connection makes the structure easier to understand. You are not learning something new, you are organizing what you already know.

Take a simple example like creating a booking.

```js
// Route — entry point
router.post("/api/bookings", bookingController.create)

// Controller — handles request/response
async function create(req, res) {
  const { flightId, userId } = req.body

  if (!flightId || !userId) {
    return res.status(400).json({ error: "Missing required fields" })
  }

  const booking = await bookingService.create({ flightId, userId })
  res.status(201).json(booking)
}

// Service — business logic
async function create({ flightId, userId }) {
  const flight = await flightRepo.findById(flightId)
  if (!flight) throw new Error("Flight not found")

  if (flight.seatsAvailable < 1) throw new Error("No seats available")

  return bookingRepo.create({ flightId, userId, status: "confirmed" })
}

// Data layer — storage
async function create(data) {
  return db.query("INSERT INTO bookings SET ?", data)
}
```

A request comes in to create a booking. The route receives it and passes it to the controller. The controller checks that the required data is present and then calls the service.

The service handles the main logic. It checks if the flight exists, verifies availability, and prepares the booking data. Once everything is valid, it sends the data to the database layer.

The database stores the booking and returns the result. That result flows back through the service and controller, and finally becomes the response sent to the client.

Each layer has a clear responsibility. The route directs traffic, the controller handles input and output, the service contains the logic, and the data layer handles storage.

This separation is what keeps backend systems maintainable. Without it, everything ends up mixed together, and even small changes become difficult.

Once you start structuring your code this way, your original mental model becomes much more powerful. You are no longer just thinking correctly, you are building systems that can grow without breaking.
