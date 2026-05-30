module.exports = (sequelize, Sequelize) => {
    const Seat = sequelize.define("Seat", {
        seatNumber: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        rowNumber: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        isHandicap: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
        },
        seatStatus: {
            type: Sequelize.STRING,
            allowNull: false,
        },
    });
    return Seat;
};