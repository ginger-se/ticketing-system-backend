const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");
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

db.ingredient = require("./ingredient.model.js")(sequelize, Sequelize);
db.recipe = require("./recipe.model.js")(sequelize, Sequelize);
db.recipeStep = require("./recipeStep.model.js")(sequelize, Sequelize);
db.recipeIngredient = require("./recipeIngredient.model.js")(
  sequelize,
  Sequelize
);
db.session = require("./session.model.js")(sequelize, Sequelize);
db.user = require("./user.model.js")(sequelize, Sequelize);
db.ticket = require("./ticket.model.js")(sequelize, Sequelize);
db.ticketSeat = require("./ticketSeat.model.js")(sequelize, Sequelize);
db.seat = require("./seat.model.js")(sequelize, Sequelize);
db.show = require("./show.model.js")(sequelize, Sequelize);
db.reservation = require("./reservation.model.js")(sequelize, Sequelize);
db.reservationSeat = require("./reservationSeat.model.js")(sequelize, Sequelize);
db.event = require("./event.model.js")(sequelize, Sequelize);
db.waitlist = require("./waitlist.model.js")(sequelize, Sequelize);
db.notification = require("./notification.model.js")(sequelize, Sequelize);

// foreign key for session
db.user.hasMany(db.session, {
  as: "session",
  foreignKey: { allowNull: false },
  onDelete: "CASCADE",
});
db.session.belongsTo(db.user, {
  as: "user",
  foreignKey: { allowNull: false },
  onDelete: "CASCADE",
});

// foreign key for recipe
db.user.hasMany(db.recipe, {
  as: "recipe",
  foreignKey: { allowNull: true },
  onDelete: "CASCADE",
});
db.recipe.belongsTo(db.user, {
  as: "user",
  foreignKey: { allowNull: true },
  onDelete: "CASCADE",
});

// foreign key for recipeStep
db.recipe.hasMany(db.recipeStep, {
  as: "recipeStep",
  foreignKey: { allowNull: false },
  onDelete: "CASCADE",
});
db.recipeStep.belongsTo(db.recipe, {
  as: "recipe",
  foreignKey: { allowNull: false },
  onDelete: "CASCADE",
});

// foreign keys for recipeIngredient
db.recipeStep.hasMany(db.recipeIngredient, {
  as: "recipeIngredient",
  foreignKey: { allowNull: true },
  onDelete: "CASCADE",
});
db.recipe.hasMany(db.recipeIngredient, {
  as: "recipeIngredient",
  foreignKey: { allowNull: false },
  onDelete: "CASCADE",
});
db.ingredient.hasMany(db.recipeIngredient, {
  as: "recipeIngredient",
  foreignKey: { allowNull: false },
  onDelete: "CASCADE",
});
db.recipeIngredient.belongsTo(db.recipeStep, {
  as: "recipeStep",
  foreignKey: { allowNull: true },
  onDelete: "CASCADE",
});
db.recipeIngredient.belongsTo(db.recipe, {
  as: "recipe",
  foreignKey: { allowNull: false },
  onDelete: "CASCADE",
});
db.recipeIngredient.belongsTo(db.ingredient, {
  as: "ingredient",
  foreignKey: { allowNull: false },
  onDelete: "CASCADE",
});

// foreign keys for ticket
db.payment.hasMany(db.ticket, {
  as: "tickets",
  foreignKey: { allowNull: false },
  onDelete: "CASCADE",
});
db.ticket.belongsTo(db.payment, {
  as: "payment",
  foreignKey: { allowNull: false },
  onDelete: "CASCADE",
});
db.event.hasMany(db.ticket, {
  as: "tickets",
  foreignKey: { allowNull: false },
  onDelete: "CASCADE",
});
db.ticket.belongsTo(db.event, {
  as: "event",
  foreignKey: { allowNull: false },
  onDelete: "CASCADE",
});

// foreign keys for ticketSeat
db.seat.hasMany(db.ticketSeat, {
  as: "ticketSeats",
  foreignKey: { allowNull: false },
  onDelete: "CASCADE",
});
db.ticketSeat.belongsTo(db.seat, {
  as: "seat",
  foreignKey: { allowNull: false },
  onDelete: "CASCADE",
});
db.ticket.hasMany(db.ticketSeat, {
  as: "ticketSeats",
  foreignKey: { allowNull: false },
  onDelete: "CASCADE",
});
db.ticketSeat.belongsTo(db.ticket, {
  as: "ticket",
  foreignKey: { allowNull: false},
  onDelete: "CASCADE",
});

// foreign keys for reservationSeat
db.reservation.hasMany(db.reservationSeat, {
  as: "reservationSeats",
  foreignKey: { allowNull: false },
  onDelete: "CASCADE",
});
db.reservationSeat.belongsTo(db.reservation, {
  as: "reservation",
  foreignKey: { allowNull: false },
  onDelete: "CASCADE",
});
db.seat.hasMany(db.reservationSeat, {
  as: "reservationSeats",
  foreignKey: { allowNull: false },
  onDelete: "CASCADE",
});
db.reservationSeat.belongsTo(db.seat, {
  as: "seat",
  foreignKey: { allowNull: false },
  onDelete: "CASCADE",
});

// foreign keys for reservation
db.user.hasMany(db.reservation, {
  as: "reservations",
  foreignKey: { allowNull: true },
  onDelete: "CASCADE",
});
db.reservation.belongsTo(db.user, {
  as: "user",
  foreignKey: { allowNull: false },
  onDelete: "CASCADE",
});
db.event.hasMany(db.reservation, {
  as: "reservations",
  foreignKey: { allowNull: false },
  onDelete: "CASCADE",
});
db.reservation.belongsTo(db.event, {
  as: "event",
  foreignKey: { allowNull: false },
  onDelete: "CASCADE",
});

// foreign keys for event
db.show.hasMany(db.event, {
  as: "events",
  foreignKey: { allowNull: false },
  onDelete: "CASCADE",
})
db.event.belongsTo(db.show, {
  as: "show",
  foreignKey: { allowNull: false },
  onDelete: "CASCADE",
})

// foreign keys for waitlist
db.user.hasMany(db.waitlist, {
  as: "waitlists",
  foreignKey: { allowNull: true },
  onDelete: "CASCADE",
});
db.waitlist.belongsTo(db.user, {
  as: "user",
  foreignKey: { allowNull: false },
  onDelete: "CASCADE",
});
db.event.hasMany(db.waitlist, {
  as: "waitlists",
  foreignKey: { allowNull: true },
  onDelete: "CASCADE",
});
db.waitlist.belongsTo(db.event, {
  as: "event",
  foreignKey: { allowNull: false },
  onDelete: "CASCADE",
});

// foreign keys for notification
db.user.hasMany(db.notification, {
  as: "notifications",
  foreignKey: { allowNull: true },
  onDelete: "CASCADE",
});
db.notification.belongsTo(db.user, {
  as: "user",
  foreignKey: { allowNull: false },
  onDelete: "CASCADE",
});

// foreign keys for sessions
db.user.hasMany(db.session, {
  as: "sessions",
  foreignKey: { allowNull: false },
  onDelete: "CASCADE",
});
db.session.belongsTo(db.user, {
  as: "user",
  foreignKey: { allowNull: false },
  onDelete: "CASCADE",
});

// foreign keys for payment
db.user.hasMany(db.payment, {
  as: "payments",
  foreignKey: { allowNull: true },
  onDelete: "CASCADE",
});
db.payment.belongsTo(db.user, {
  as: "user",
  foreignKey: { allowNull: false },
  onDelete: "CASCADE",
});

// foreign keys for refund
db.payment.hasMany(db.refund, {
  as: "refunds",
  foreignKey: { allowNull: true },
  onDelete: "CASCADE",
});
db.refund.belongsTo(db.payment, {
  as: "payment",
  foreignKey: { allowNull: false },
  onDelete: "CASCADE",
});

module.exports = db;