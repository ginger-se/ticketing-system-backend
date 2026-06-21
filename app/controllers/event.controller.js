const db = require("../models");
const Event = db.event;
const Op = db.Sequelize.Op;
const Sequelize = db.Sequelize;

// Create and Save an event
exports.create = async (req, res) => {
  if (req.body.startTime === undefined) {
    res.status(400).send({
      message: "Start Time cannot be empty for event!",
    });
    return;
    res.status(400).send({
      message: "Start Time cannot be empty for event!",
    });
    return;
  } else if (req.body.endTime == undefined) {
    res.status(400).send({
      message: "End time cannot be empty for event",
    });
    return;
    res.status(400).send({
      message: "End time cannot be empty for event",
    });
    return;
  } else if (req.body.capacity == undefined) {
    res.status(400).send({
      message: "Capacity cannot be empty for event!",
    });
    return;
    res.status(400).send({
      message: "Capacity cannot be empty for event!",
    });
    return;
  } else if (req.body.showId == undefined) {
     res.status(400).send({
      message: "Show ID cannot be empty for event!",
    });
    return;
  } else if (req.body.date == undefined) {
     res.status(400).send({
      message: "date cannot be empty for event!",
    });
    return;
     res.status(400).send({
      message: "Show ID cannot be empty for event!",
    });
    return;
  } else if (req.body.date == undefined) {
     res.status(400).send({
      message: "date cannot be empty for event!",
    });
    return;
  }

  const event = {
    startTime: req.body.startTime,
    endTime: req.body.endTime,
    status: req.body.status || "Scheduled",
    capacity: req.body.capacity,
    showId: req.body.showId,
    date: req.body.date,
    date: req.body.date,
  };
  
  if(req.body.date && req.body.RecurrenceEnd){
    let current = new Date(req.body.date);
    let end = new Date(req.body.RecurrenceEnd);
    let count = 0;
    while(current <= end){
      if (req.body.Days.includes(current.getDay())){

        event.date = current;
        try {
          await Event.create(event);
          count++;
        } catch (err) {
          res.status(500).send({
            message: err.message || "Some error occurred while creating the Event.",
          });
          return;  
        }
      }
      current.setDate(current.getDate() + 1);
    }
    res.send({
      message: count + " Events created Successfully",
    });
    return;
  }else {
    try {
      const data = await Event.create(event);
      res.send(data);
    } catch (err) {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Event.",
      });
    }
  }
};

// Retrieve all Events from the database
exports.findAll = async (req, res) => {
  const showId = req.query.showId;
  var condition = showId ? { showId: showId } : null;

  try {
    const data = await Event.findAll({
      attributes: [
        'id','date',[Sequelize.fn('TIME_FORMAT', Sequelize.col('startTime'), '%h:%i %p'), 'startTime'],[Sequelize.fn('TIME_FORMAT', Sequelize.col('endTime'), '%h:%i %p'), 'endTime'],
        'status', 'capacity', 'createdAt', 'updatedAt', 'showId',
      ],
      where: condition,
      order: [["date", "ASC"]],
      include: [{ model: db.show, as: "show" }],
    });
    res.send(data);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving events.",
    });
  }
};

// Find a single Event with an id
exports.findOne = async (req, res) => {
  const id = req.params.id;

  try {
    const data = await Event.findByPk(id, {
      attributes: [
        'id','date',[Sequelize.fn('TIME_FORMAT', Sequelize.col('startTime'), '%h:%i %p'), 'startTime'],[Sequelize.fn('TIME_FORMAT', Sequelize.col('endTime'), '%h:%i %p'), 'endTime'],
        'status', 'capacity', 'createdAt', 'updatedAt', 'showId',
      ],
      include: [{ model: db.show, as: "show" }],
    });
    res.send(data);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Error retrieving Event with id=" + id,
    });
  }
};

// Update an Event by the id in the request
exports.update = async (req, res) => {
  const id = req.params.id;

  try {
    const num = await Event.update(req.body, {
      where: { id: id },
    });
    if (num == 1) {
      res.send({ message: "Event was updated successfully." });
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

// Cancel an Event
exports.cancel = async (req, res) => {
  const id = req.params.id;

  try {
    const num = await Event.update(
      { status: "Cancelled" },
      { where: { id: id } }
    );
    if (num == 1) {
      res.send({ message: "Event was cancelled successfully." });
    } else {
      res.send({
        message: `Cannot cancel Event with id=${id}. Maybe Event was not found!`,
      });
    }
  } catch (err) {
    res.status(500).send({
      message: err.message || "Error cancelling Event with id=" + id,
    });
  }
};

// Retrieve events for today
exports.findToday = async (req, res) => {
  const currentDate = new Date().toISOString().split('T')[0]; 

  try {
    const data = await Event.findAll({
      attributes: [
        'id','date',[Sequelize.fn('TIME_FORMAT', Sequelize.col('startTime'), '%h:%i %p'), 'startTime'],[Sequelize.fn('TIME_FORMAT', Sequelize.col('endTime'), '%h:%i %p'), 'endTime'],
        'status', 'capacity', 'createdAt', 'updatedAt', 'showId',
      ],
      where: {
        date: currentDate
      },
      order: [["startTime", "ASC"]],
      include: [{ model: db.show, as: "show" }],
    });
    res.send(data);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving events for today.",
    });
  }
};