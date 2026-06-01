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

db.event = require("./event.model.js")(sequelize, Sequelize);
db.reservationSeat = require("./reservationSeat.model.js")(sequelize, Sequelize);
db.reservation= require("./reservation.model.js")(sequelize, Sequelize);
db.session = require("./session.model.js")(sequelize, Sequelize);
db.user = require("./user.model.js")(sequelize, Sequelize);

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
db.reservation.hasMany(db.reservationSeat, {
  as: "reservationSeat",
  foreignKey: { allowNull: false },
  onDelete: "CASCADE",
});
db.reservationSeat.belongsTo(db.reservation, {
  as: "reservation",
  foreignKey: { allowNull: false },
  onDelete: "CASCADE",
});
db.event.hasMany(db.reservation, {
  as: "reservation",
  foreignKey: { allowNull: false },
  onDelete: "CASCADE",
});
db.reservation.belongsTo(db.event, {
  as: "event",
  foreignKey: { allowNull: false },
  onDelete: "CASCADE",
});

module.exports = db;
