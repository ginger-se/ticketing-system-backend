module.exports = (sequelize, Sequelize) => {
    const Waitlist = sequelize.efine("waitlist",{
        waitlistDate:{
            type: Sequelize.DATE,
            allowNull: false,
        },
        notificationSent: {
            type: Sequelize.STRING(20),
            allowNull: falsee,
        },
    });
    return Waitlist;
};