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

  try {
    const result = await db.sequelize.transaction(async t => {

      const order = await Order.create(
        {
          userId: req.body.userId,
          totalAmount: req.body.totalAmount,
          orderStatus: "Completed"
        },
        { transaction: t},
      );

      const payment = await Payment.create(
        {
          amount: req.body.totalAmount,
          paymentMethod: req.body.paymentMethod,
          orderId: order.id,
          userId: req.body.userId
        },
        { transaction: t},
      );

      return result;
    });
  } catch (error) {

  }

};
