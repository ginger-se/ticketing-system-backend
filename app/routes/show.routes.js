module.exports = (app) => {
  const Show = require("../controllers/show.controller.js");
  const { authenticateRoute } = require("../authentication/authentication");
  var router = require("express").Router();

  // Create a new show
  router.post("/shows/", Show.create);

  // Retrieve all shows
  router.get("/shows/", Show.findAll);

  // Retrieve a single show with id
  router.get("/shows/:id", Show.findOne);

  // Update a show with id
  router.put("/shows/:id", [authenticateRoute], Show.update);

  // Delete a show with id
  router.delete("/shows/:id", [authenticateRoute], Show.delete);

  // Delete all shows
  router.delete("/shows/", [authenticateRoute], Show.deleteAll);

  app.use("/recipeapi", router);
};