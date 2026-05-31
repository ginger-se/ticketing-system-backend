module.exports = (sequelize, Sequelize) => {
    const Waitlist = sequelize.efine("waitlist",{
        waitlistDate:{
            type: Sequelize.DATE,
            allowNull: true,
        },
        notificationSent: {
            type: Sequelize.STRING(20),
            allowNull: true,
        },
    });
    return Waitlist;
};