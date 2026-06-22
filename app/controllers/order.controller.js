const db = require("../models");
const Order = db.order;
const Payment = db.payment;
const Ticket = db.ticket;

// Create and Save an order
exports.create = async (req, res) => {
  if (req.body.eventId === undefined) {
    const error = new Error("eventId cannot be empty for order!");
    error.statusCode = 400;
    throw error;
  } else if (req.body.totalAmount === undefined) {
    const error = new Error("totalAmount cannot be empty for order!");
    error.statusCode = 400;
    throw error;
  } else if (req.body.paymentMethod === undefined) {
    const error = new Error("paymentMethod cannot be empty for order!");
    error.statusCode = 400;
    throw error;
  } else if (req.body.seatIds === undefined) {
    const error = new Error("seat Ids cannot be empty for order!");
    error.statusCode = 400;
    throw error;
  } else if (req.body.email === undefined) {
    const error = new Error("email cannot be empty for order!");
    error.statusCode = 400;
    throw error;
  }

  try {
    const result = await db.sequelize.transaction(async t => {
      const order = await Order.create(
        {
          userId: req.body.userId,
          totalAmount: req.body.totalAmount,
          orderStatus: "Completed",
          email: req.body.email
        },
        { transaction: t},
      );

      const payment = await Payment.create(
        {
          amount: req.body.totalAmount,
          paymentMethod: req.body.paymentMethod,
          paymentStatus: "Paid",
          userId: req.body.userId,
          orderId: order.id
        },
        { transaction: t},
      );

      for (const seatId of req.body.seatIds) {
        let ticket = await Ticket.create(
          {
            QRCode: "http://localhost:3200/museumapi/tickets/checkin/",
            ticketType: "General Admission",
            ticketStatus: "Valid",
            purchaseDate: Date.now(),
            eventId: req.body.eventId,
            seatId: seatId,
            paymentId: payment.id,
            orderId: order.id,
          },
          { transaction: t},
        )
        ticket.QRCode += ticket.id;
        await ticket.save({ transaction: t });
      }
      return order;
    });
    res.send(result);
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: err.message || "Some error occurred while creating the order.",
    });
  }
};

// Retrieve all Orders from the database
exports.findAll = async (req, res) => {
  try {
    const data = await Order.findAll({
      include: [
        { model: db.payment,
          required: true,
          attributes: ['amount', 'paymentStatus'],
          include:[
            {
              model: db.user,
              as: "user",
              attributes: ['firstName', 'lastName', 'email']
            },
          ]
          , as: "orderPayments"
        }
      ],
    });
    res.send(data);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving orders.",
    });
  }
};

// Retrieve all Orders for a user
exports.findForUser = async (req, res) => {
  const userId = req.params.userId;

  try {
    const data = await Order.findAll({
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
        , as: "orderPayments"
        }
      ],
    });
    res.send(data);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving orders with userId = " + userId,
    });
  }
};

// Find a single Order with an id
exports.findOne = async (req, res) => {
  const id = req.params.id;

  try {
    const data = await Order.findByPk(id, {
      include: [
        { model: db.payment,
          required: true,
          attributes: ['amount', 'paymentStatus'],
          include:[
            {
              model: db.user,
              as: "user",
              attributes: ['firstName', 'lastName', 'email'],
            },
          ]
          , as: "orderPayments"
        },
        {
          model: db.ticket,
          as: "orderTickets"
        }
      ],
    });
    res.send(data);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Error retrieving Order with id=" + id,
    });
  }
};

// Update an Order by the id in the request
exports.update = async (req, res) => {
  const id = req.params.id;

  try {
    const num = await Order.update(req.body, {
      where: { id: id },
    });
    if (num == 1) {
      res.send({ message: "Order was updated successfully." });
    } else {
      res.send({
        message: `Cannot update order with id=${id}. Maybe order was not found or req.body is empty!`,
      });
    }
  } catch (err) {
    res.status(500).send({
      message: err.message || "Error updating Order with id=" + id,
    });
  }
};