const db = require("../models");
exports.getStats = async (req, res) => {
    try{
        const totalSales = await db.payment.sum("amount") ||0;
        const ticketsSold = await db.ticket.count();
        const upcomingShows = await db.event.count({
            where: {
                status: "Scheduled",
                }
        });
        const activeUsers = await db.user.count();

        res.send({ totalSales, ticketsSold, upcomingShows, activeUsers });
    } catch (err) {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving stats."
        });
    }
};