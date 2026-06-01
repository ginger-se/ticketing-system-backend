module.exports =(sequelize, Sequelize) => {
    const Notification = sequelize.define("notification",{
          message:{
            type: Sequelize.STRING(225),
            allowNull: true,
          },
        dateSent:{
            type: Sequelize.DATE,
            allowNull:true,
        },
    });
     return Notification; 

};