module.exports = (app) => {
  const Event = require("../controllers/event.controller.js");
  const { authenticateRoute } = require("../authentication/authentication");
  var router = require("express").Router();

  // Create a new show
  router.post("/events/", Event.create);

  // Retrieve all shows
  router.get("/events/", Event.findAll);

  // Retrieve a single show with id
  router.get("/events/:id", Event.findOne);

  // Update a show with id
  router.put("/events/:id", [authenticateRoute], Event.update);

  // Delete a show with id
  router.delete("/events/:id", [authenticateRoute], Event.delete);

  // Delete all shows
  router.delete("/events/", [authenticateRoute], Event.deleteAll);

  app.use("/recipeapi", router);
};