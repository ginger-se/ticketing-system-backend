module.exports = (sequelize, Sequelize) => {
  class Refund extends Model {}

    Refund.init(
      {
        // Model attributes are defined here
        RefundId: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        RefundDate:{
          type: DataTypes.TIMESTAMP,
          allowNull: false,
        },
        processedDate:{
          type: DataTypes.TIMESTAMP,
          allowNull: false,
        },
        RefundStatus: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
      },
      {
        // Other model options go here
        sequelize, // We need to pass the connection instance
        modelName: 'Refund', // We need to choose the model name
      },
    );
  return Refund;
};
