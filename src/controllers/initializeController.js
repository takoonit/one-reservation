const {ReservationService} = require('../services/ReservationService');

async function initializeTables(req, res) {
    try {
        const {table_count, max_reserve_percentage} = req.body;
        const maxReserveSeat = max_reserve_percentage
            ? Math.floor(table_count * max_reserve_percentage)
            : table_count;

        // Delegate to the service layer
        const result = await ReservationService.initializeTables(table_count, maxReserveSeat);

        return res.status(200).json({
            table_count: result.table_count,
            max_reserve_seat: result.max_reserve_seat,
        });
    } catch (error) {
        return res.status(error.status || 500).json({error: error.message});
    }
}

module.exports = {initializeTables};
