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
exports.getReport = async (req, res) => {
    try{
        const totalRevenue = await db.payment.sum("amount") || 0;
        const ticketsSold = await db.ticket.count();
        const totalCapacity = await db.event.sum("capacity") || 0;
        const avgOccupancy = totalCapacity > 0 ? Math.round((ticketsSold / totalCapacity) * 100) : 0;
        const refundsIssued = await db.refund.count();

        const events = await db.event.findAll({
            include: [
                { model: db.show, as: "show", attributes: ["title", "price"] },
                { model: db.ticket, as: "eventTickets", attributes: ["id"] }
            ]
        });

        res.send({ totalRevenue, ticketsSold, avgOccupancy, refundsIssued, events });
    } catch (err) {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving report."
        });
    }
};