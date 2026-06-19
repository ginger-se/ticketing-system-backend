const db = require("../models");
const Order = db.order;
const Payment = db.payment;
const Ticket = db.ticket;
const Op = db.Sequelize.Op;

// Create and Save an order
exports.create = async (req, res) => {
  if (req.body.userId === undefined) {
    const error = new Error("userId cannot be empty for order!");
    error.statusCode = 400;
    throw error;
  } else if (req.body.eventId === undefined) {
    const error = new Error("eventId cannot be empty for order!");
    error.statusCode = 400;
    throw error;
  } else if (req.body.totalAmount === undefined) {
    const error = new Error("totalAmount cannot be empty for order");
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
  }

  let order = {
    userId: req.body.userId,
    totalAmount: req.body.totalAmount,
    orderStatus: "Completed"
  };

  let payment = {
    amount: req.body.totalAmount,
    paymentMethod: req.body.paymentMethod,
    orderId: order.orderId,
    userId: req.body.userId
  };

  payment.paymentDate = Date.now();
  payment.paymentStatus = "Paid";

  for (seatId in req.body.seatIds) {
    let ticket = {
      QRCode: entry,
      eventId: req.body.eventId,


    }
  }

};