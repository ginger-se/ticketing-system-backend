module.exports = (sequelize, Sequelize, DataTypes) => {
  const Order = sequelize.define("order", {
    totalAmount: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: false,
    },
    orderStatus: {
      type: Sequelize.STRING,
      allowNull: false,
    }
  });
  return Order;
};