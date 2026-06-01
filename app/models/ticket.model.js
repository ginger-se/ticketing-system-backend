module.exports = (sequelize, Sequelize) => {
    const Ticket = sequelize.define("Ticket", {
        QRCode: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        ticketType: {
            type: Sequelize.STRING(25),
            allowNull: false,
        },
        purchaseDate: {
            type: Sequelize.DATE,
            allowNull: false,
        },
        ticketStatus: {
            type: Sequelize.STRING(25),
            allowNull: false,
        },
    });
    return Ticket;
};