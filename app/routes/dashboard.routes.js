module.exports = (app) => {
    const dashboard = require("../controllers/dashboard.controller.js");
    const { authenticateRoute } = require("../authentication/authentication");
    const isAdmin  = require("../middleware/isAdmin");
    var router = require("express").Router();
    
    router.get("/dashboard/stats", [authenticateRoute, isAdmin], dashboard.getStats);
    app.use("/museumapi", router);
};