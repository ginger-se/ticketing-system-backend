module.exports = (app) => {
  const Event = require("../controllers/event.controller.js");
  const { authenticateRoute } = require("../authentication/authentication");
  const isAdmin = require("../middleware/isAdmin");
  var router = require("express").Router();

  // Create a new show
  router.post("/events/", [authenticateRoute, isAdmin], Event.create);

  // Retrieve all shows
  router.get("/events/", Event.findAll);

  // Retrieve a single show with id
  router.get("/events/:id", Event.findOne);

  // Retrieve events for today
  router.get("/eventsToday", Event.findToday);

  // Update a show with id
  router.put("/events/:id", [authenticateRoute, isAdmin], Event.update);

  // Delete a show with id
  router.delete("/events/:id", [authenticateRoute, isAdmin], Event.delete);

  // Delete all shows
  router.delete("/events/", [authenticateRoute, isAdmin], Event.deleteAll);

  app.use("/recipeapi", router);
};