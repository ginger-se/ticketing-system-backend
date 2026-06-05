const db = require("../models");
exports.getStats = async (req, res) => {
    try{
        const stats = await db.payment.sum("amount") ||0;
        const ticketsSold = await db.ticketicket.count();
        const upcomingShows = await db.event.count({
            where: {
                status: "upcoming",
                }
        });
        const activeUsers = await db.user.count();

        res.send({ totalSales, ticketSold, upcomingShows, activeUsers });
    } catch (err) {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving stats."
        });
    }
};