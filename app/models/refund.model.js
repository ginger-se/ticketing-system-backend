module.exports = (sequelize, Sequelize, DataTypes, Model) => {
  class Refund extends Model {}

    Refund.init(
      {
        requestDate:{
          type: DataTypes.DATE,
          allowNull: false,
          DefaultValue: DataTypes.NOW
        },
        processedDate:{
          type: DataTypes.DATE,
          allowNull: true,
        },
        refundStatus: {
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
