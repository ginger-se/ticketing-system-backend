const db = require("../models");
const Ticket = db.ticket;
const Op = db.Sequelize.Op;

// Create and Save an seat
exports.create = async (req, res) => {
  if (req.body.ticketType === undefined) {
    const error = new Error("ticketType cannot be empty for ticket!");
    error.statusCode = 400;
    throw error;
  } else if (req.body.eventId === undefined) {
    const error = new Error("eventId cannot be empty for ticket");
    error.statusCode = 400;
    throw error;
  }else if (req.body.paymentId === undefined) {
    const error = new Error("paymentId cannot be empty for ticket");
    error.statusCode = 400;
    throw error;
  } else if (req.body.ticketStatus === undefined) {
    const error = new Error("ticketStatus cannot be empty for ticket!" + req.body);
    error.statusCode = 400;
    throw error;
  }

  let ticket = {
    ticketType: req.body.ticketType,
    ticketStatus: req.body.ticketStatus,
    eventId: req.body.eventId ,
    paymentId: req.body.paymentId,

  };

  ticket.QRCode = "http://localhost:3200/museumapi/tickets/checkin/" + Math.random();
  ticket.purchaseDate = Date.now();

  try {
    const data = await Ticket.create(ticket);
    res.send(data);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while creating the Ticket.",
    });
  }
};

// Retrieve all Tickets from the database
exports.findAll = async (req, res) => {

  try {
    const data = await Ticket.findAll({
        include: [
            { model: db.payment,
                required: true,
                attributes: ['amount', 'paymentStatus'],
                include:[
                    {
                        model: db.user,
                        as: "user",
                        required: true,
                        attributes: ['firstName', 'lastName', 'email']
                    },
                ]
                , as: "payment"
            }
        ],
    });
    res.send(data);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving tickets.",
    });
  }
};
// Retrieve all Tickets for a user
exports.findForUser = async (req, res) => {
    const userId = req.params.userId;
  try {
    const data = await Ticket.findAll({
        include: [
            { model: db.payment,
                required: true,
                attributes: ['amount', 'paymentStatus'],
                include:[
                    {
                        model: db.user,
                        as: "user",
                        required: true,
                        attributes: ['firstName', 'lastName', 'email'],
                        where: {
                            id: userId
                        }
                    },
                ]
            , as: "payment"
            }
        ],
    });
    res.send(data);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving tickets with userId = " + userId,
    });
  }
};

// Find a single Ticket with an id
exports.findOne = async (req, res) => {
  const id = req.params.id;

  try {
    const data = await Ticket.findByPk(id, {
        include: [
            { model: db.payment,
                required: true,
                attributes: ['amount', 'paymentStatus'],
                include:[
                    {
                        model: db.user,
                        as: "user",
                        required: true,
                        attributes: ['firstName', 'lastName', 'email'],
                    },
                ]
                , as: "payment"
            }
        ],
    });
    res.send(data);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Error retrieving Ticket with id=" + id,
    });
  }
};

// Update a Ticket by the id in the request
exports.update = async (req, res) => {
  const id = req.params.id;

  try {
    const num = await Ticket.update(req.body, {
      where: { id: id },
    });
    if (num == 1) {
      res.send({ message: "Ticket was updated successfully." });
    } else {
      res.send({
        message: `Cannot update ticket with id=${id}. Maybe ticket was not found or req.body is empty!`,
      });
    }
  } catch (err) {
    res.status(500).send({
      message: err.message || "Error updating Ticket with id=" + id,
    });
  }
};


// Delete an Ticket with the specified id
exports.delete = async (req, res) => {
  const id = req.params.id;

  try {
    const number = await Ticket.destroy({
      where: { id: id },
    });
    if (number == 1) {
      res.send({ message: "Ticket was deleted successfully!" });
    } else {
      res.send({
        message: `Cannot delete ticket with id=${id}. Maybe ticket was not found!`,
      });
    }
  } catch (err) {
    res.status(500).send({
      message: err.message || "Could not delete Ticket with id=" + id,
    });
  }
};

exports.adminRefundTicket = async (req, res) => {
  const id = req.params.id;
  const refundAmount = req.body.refundAmount;

  if (refundAmount === undefined) {
    return res.status(400).send({ message: "refundAmount is required in the request body." });
  }

  const t = await db.sequelize.transaction();
  try {
    const ticket = await Ticket.findByPk(id, { transaction: t });
    if (!ticket) {
      await t.rollback();
      return res.status(404).send({ message: `Ticket with id=${id} not found.` });
    }

    const payment = await db.payment.findByPk(ticket.paymentId, { transaction: t });
    if (!payment) {
      await t.rollback();
      return res.status(404).send({ message: `Payment for ticket id=${id} not found.` });
    }

    const newAmount = parseFloat(payment.amount) - parseFloat(refundAmount);

    await ticket.destroy({ transaction: t });
    await payment.update({ amount: newAmount }, { transaction: t });

    await t.commit();
    res.send({ message: "Ticket reservation deleted and payment updated successfully.", newPaymentAmount: newAmount });
  } catch (err) {
    await t.rollback();
    res.status(500).send({ message: err.message || "Could not process refund for ticket id=" + id });
  }
};
