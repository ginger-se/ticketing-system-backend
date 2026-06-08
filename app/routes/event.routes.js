module.exports = (app) => {
  const Event = require("../controllers/event.controller.js");
  const { authenticateRoute } = require("../authentication/authentication");
  const isAdmin = require("../middleware/isAdmin");
  var router = require("express").Router();

  // Create a new event
  router.post("/events/", [authenticateRoute, isAdmin], Event.create);

  // Retrieve all events
  router.get("/events/", Event.findAll);

  // Retrieve events for today 
  router.get("/events/today", Event.findToday);

  // Retrieve a single event with id 
  router.get("/events/:id", Event.findOne);

  // Update an event with id
  router.put("/events/:id", [authenticateRoute, isAdmin], Event.update);

  // Cancel an event
  router.put("/events/:id/cancel", [authenticateRoute, isAdmin], Event.cancel);

  // Delete an event with id
  router.delete("/events/:id", [authenticateRoute, isAdmin], Event.delete);

  // Delete all events
  router.delete("/events/", [authenticateRoute, isAdmin], Event.deleteAll);

  app.use("/museumapi", router);
};