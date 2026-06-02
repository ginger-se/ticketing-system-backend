const dbConfig = require("../config/db.config.js");
const {Sequelize, DataTypes, Model} = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.event = require("./event.model.js")(sequelize, Sequelize);
db.reservationSeat = require("./reservationSeat.model.js")(sequelize, Sequelize);
db.reservation= require("./reservation.model.js")(sequelize, Sequelize);
db.session = require("./session.model.js")(sequelize, Sequelize);
db.user = require("./user.model.js")(sequelize, Sequelize);
db.ticket = require("./ticket.model.js")(sequelize, Sequelize);
db.ticketSeat = require("./ticketSeat.model.js")(sequelize, Sequelize);
db.seat = require("./seat.model.js")(sequelize, Sequelize);
db.show = require("./show.model.js")(sequelize, Sequelize);
db.waitlist = require("./waitlist.model.js")(sequelize, Sequelize);
db.notification = require("./notification.model.js")(sequelize, Sequelize);
db.payment = require("./payment.model.js")(sequelize, Sequelize, DataTypes, Model);
db.refund = require("./refund.model.js")(sequelize, Sequelize, DataTypes, Model);


<<<<<<< HEAD
// foreign keys for ticket
db.payment.hasMany(db.ticket, {
  as: "tickets",
  foreignKey: { allowNull: false },
=======
// foreign keys for session
db.user.hasMany(db.session, {
  as: "sessions",
  foreignKey: { name: "userId", allowNull: false },
  onDelete: "CASCADE",
});
<<<<<<< HEAD
db.ticket.belongsTo(db.payment, {
  as: "payment",
  foreignKey: { allowNull: false },
  onDelete: "CASCADE",
});
db.event.hasMany(db.ticket, {
  as: "tickets",
  foreignKey: { allowNull: false },
=======
db.session.belongsTo(db.user, {
  as: "user",
  foreignKey: { name: "userId", allowNull: false },
  onDelete: "CASCADE",
});

// foreign keys for show -> event
db.show.hasMany(db.event, {
  as: "events",
  foreignKey: { name: "showId", allowNull: false },
>>>>>>> 16f082c (added show routes and updated index)
>>>>>>> 4af2d89 (added show routes and updated index)
  onDelete: "CASCADE",
});
db.event.belongsTo(db.show, {
  as: "show",
  foreignKey: { name: "showId", allowNull: false },
  onDelete: "CASCADE",
});

// foreign keys for reservation
db.user.hasMany(db.reservation, {
  as: "reservations",
  foreignKey: { name: "userId", allowNull: true },
  onDelete: "CASCADE",
});
db.reservation.belongsTo(db.user, {
  as: "user",
  foreignKey: { name: "userId", allowNull: false },
  onDelete: "CASCADE",
});
db.event.hasMany(db.reservation, {
  as: "reservations",
  foreignKey: { name: "eventId", allowNull: false },
  onDelete: "CASCADE",
});
db.reservation.belongsTo(db.event, {
  as: "event",
  foreignKey: { name: "eventId", allowNull: false },
  onDelete: "CASCADE",
});

// foreign keys for reservationSeat
db.reservation.hasMany(db.reservationSeat, {
  as: "reservationSeats",
  foreignKey: { name: "reservationId", allowNull: false },
  onDelete: "CASCADE",
});
db.reservationSeat.belongsTo(db.reservation, {
  as: "reservation",
  foreignKey: { name: "reservationId", allowNull: false },
  onDelete: "CASCADE",
});
db.seat.hasMany(db.reservationSeat, {
  as: "reservationSeats",
  foreignKey: { name: "seatId", allowNull: false },
  onDelete: "CASCADE",
});
db.reservationSeat.belongsTo(db.seat, {
  as: "seat",
  foreignKey: { name: "seatId", allowNull: false },
  onDelete: "CASCADE",
});

// foreign keys for ticket
db.payment.hasMany(db.ticket, {
  as: "tickets",
  foreignKey: { name: "paymentId", allowNull: false },
  onDelete: "CASCADE",
});
db.ticket.belongsTo(db.payment, {
  as: "payment",
  foreignKey: { name: "paymentId", allowNull: false },
  onDelete: "CASCADE",
});
db.event.hasMany(db.ticket, {
  as: "tickets",
  foreignKey: { name: "eventId", allowNull: false },
  onDelete: "CASCADE",
});
db.ticket.belongsTo(db.event, {
  as: "event",
  foreignKey: { name: "eventId", allowNull: false },
  onDelete: "CASCADE",
});

// foreign keys for ticketSeat
db.ticket.hasMany(db.ticketSeat, {
  as: "ticketSeats",
  foreignKey: { name: "ticketId", allowNull: false },
  onDelete: "CASCADE",
});
db.ticketSeat.belongsTo(db.ticket, {
  as: "ticket",
  foreignKey: { name: "ticketId", allowNull: false },
  onDelete: "CASCADE",
});
db.seat.hasMany(db.ticketSeat, {
  as: "ticketSeats",
  foreignKey: { name: "seatId", allowNull: false },
  onDelete: "CASCADE",
});
db.ticketSeat.belongsTo(db.seat, {
  as: "seat",
  foreignKey: { name: "seatId", allowNull: false },
  onDelete: "CASCADE",
});

// foreign keys for waitlist
db.user.hasMany(db.waitlist, {
  as: "waitlists",
  foreignKey: { name: "userId", allowNull: true },
  onDelete: "CASCADE",
});
db.waitlist.belongsTo(db.user, {
  as: "user",
  foreignKey: { name: "userId", allowNull: false },
  onDelete: "CASCADE",
});
db.event.hasMany(db.waitlist, {
  as: "waitlists",
  foreignKey: { name: "eventId", allowNull: true },
  onDelete: "CASCADE",
});
db.waitlist.belongsTo(db.event, {
  as: "event",
  foreignKey: { name: "eventId", allowNull: false },
  onDelete: "CASCADE",
});

// foreign keys for notification
db.user.hasMany(db.notification, {
  as: "notifications",
  foreignKey: { name: "userId", allowNull: true },
  onDelete: "CASCADE",
});
db.notification.belongsTo(db.user, {
  as: "user",
  foreignKey: { name: "userId", allowNull: false },
  onDelete: "CASCADE",
});

// foreign keys for payment
db.user.hasMany(db.payment, {
  as: "payments",
  foreignKey: { name: "userId", allowNull: true },
  onDelete: "CASCADE",
});
db.payment.belongsTo(db.user, {
  as: "user",
  foreignKey: { name: "userId", allowNull: false },
  onDelete: "CASCADE",
});

// foreign keys for refund
db.payment.hasMany(db.refund, {
  as: "refunds",
  foreignKey: { name: "paymentId", allowNull: true },
  onDelete: "CASCADE",
});
db.refund.belongsTo(db.payment,  {
  as: "payment",
  foreignKey: { name: "paymentId", allowNull: false },
  onDelete: "CASCADE",
});

module.exports = db;