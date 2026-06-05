const db = require("../models");
const Event = db.event;
const Op = db.Sequelize.Op;

// Create and Save an event
exports.create = async (req, res) => {
  // Validate request
  if (req.body.startTime === undefined) {
    const error = new Error("Start Time cannot be empty for event!");
    error.statusCode = 400;
    throw error;
  } else if( req.body.endTime == undefined){
    const error = new Error("End time cannot be empty for event");
    error.statusCode = 400;
    throw error;
  }
  else if( req.body.capacity == undefined){
    const error = new Error("Capacity cannot be empty for event!");
    error.statusCode = 400;
    throw error;
  }
 else if( req.body.showId == undefined){
    const error = new Error("Show ID cannot be empty for event!");
    error.statusCode = 400;
    throw error;
  }

  // Create an event
  const event = {
    startTime: req.body.startTime,
    endTime: req.body.endTime,
    status: req.body.status,
    capacity: req.body.capacity,
    showId: req.body.showId,

    
  };
  // Save event in the database
  try {
    const data = await Event.create(event);
    res.send(data);
  } catch (err) {
    res.status(500).send({
      message:
        err.message || "Some error occurred while creating the Event.",
    });
  }
};

// Retrieve all Event from the database.
exports.findAll = async (req, res) => {
  const showId = req.query.showId;
  var condition = showId
    ? {
        showId: {
          [Op.like]: `%${showId}%`,
        },
      }
    : null;

  try {
    const data = await Event.findAll({ where: condition, order: [["startTime", "ASC"]] });
    res.send(data);
  } catch (err) {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving events.",
    });
  }
};

// Find a single Show with an id
exports.findOne = async (req, res) => {
  const id = req.params.id;

  try {
    const data = await Event.findByPk(id);
    res.send(data);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Error retrieving Event with id=" + id,
    });
  }
};

// Update a Show by the id in the request
exports.update = async (req, res) => {
  const id = req.params.id;

  try {
    const num = await Event.update(req.body, {
      where: { id: id },
    });
    if (num == 1) {
      res.send({
        message: "Event was updated successfully.",
      });
    } else {
      res.send({
        message: `Cannot update Event with id=${id}. Maybe Event was not found or req.body is empty!`,
      });
    }
  } catch (err) {
    res.status(500).send({
      message: err.message || "Error updating Event with id=" + id,
    });
  }
};

// Delete a Show with the specified id in the request
exports.delete = async (req, res) => {
  const id = req.params.id;

  try {
    const number = await Event.destroy({
      where: { id: id },
    });
    if (number == 1) {
      res.send({
        message: "Event was deleted successfully!",
      });
    } else {
      res.send({
        message: `Cannot delete Event with id=${id}. Maybe Event was not found!`,
      });
    }
  } catch (err) {
    res.status(500).send({
      message: err.message || "Could not delete Event with id=" + id,
    });
  }
};

// Delete all Shows from the database.
exports.deleteAll = async (req, res) => {
  try {
    const number = await Event.destroy({
      where: {},
      truncate: false,
    });
    res.send({ message: `${number} Events were deleted successfully!` });
  } catch (err) {
    res.status(500).send({
      message:
        err.message || "Some error occurred while removing all events.",
    });
  }
};

//retrieve events for today
exports.findToday = async (req, res) => {
  const today = new Date();
  const startOfDay= new Date(today.getFullYear(),today.getMonth(),today.getDate(),0,0,0);
  const endOfDay= new Date(today.getFullYear(),today.getMonth(),today.getDate(),23,59,59);

  try {
    const data = await Event.findAll({
      where: {
        startTime: {
          [Op.between]: [startOfDay, endOfDay]
        },
      },
      order: [["startTime", "ASC"]],
    });
    res.send(data);
  } catch (err) {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving events for today.",
    });
  }
};