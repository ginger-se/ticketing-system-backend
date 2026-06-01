module.exports= (sequelize, Sequelize) =>{
    const Event = sequelize.define("event", {
        startTime: {
            type: Sequelize.DATE,
            allowNull: false,
        },
        endTime: {
            type:Sequelize.DATE,
            allowNull: false,
        },
        status: {
            type: Sequelize.ENUM('Scheduled', 'Cancelled' , 'Completed'),
            allowNull: false,
            defaultValue: 'Scheduled',
        },
        capacity: {
            type: Sequelize.INTEGER,
            allowNull: false,
        }
    });
        
    return Event;
}