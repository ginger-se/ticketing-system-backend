module.exports = (sequelize, Sequelize, DataTypes) => {
  const Order = sequelize.define("order", {
    orderDate: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    orderStatus: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    totalAmount: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: false,
    },
  });
  return Order;
};