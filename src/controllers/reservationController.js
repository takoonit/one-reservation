const {reserveTables} = require("../services/reserveService");
const {logger} = require("../config/logger");

/**
 * Controller function to handle the reservation request.
 */
const reservationController = async (req, res) => {
    try {
        const {number_of_customers, contact_no} = req.body;

        logger.info(`Reservation request received: ${number_of_customers} customers, contact: ${contact_no}`);

        // Call the service layer to reserve tables
        const reservationResult = await reserveTables(number_of_customers, contact_no);

        logger.info(`Reservation successful: ${JSON.stringify(reservationResult)}`);

        // Send the response back with the reservation details
        return res.status(200).json(reservationResult);
    } catch (error) {
        logger.error(`Reservation failed: ${error.message}`);
        return res.status(error.statusCode || 500).json({message: error.message});
    }
};

module.exports = {reservationController};

/**
 * @swagger
 * components:
 *   schemas:
 *     Reservation:
 *       type: object
 *       required:
 *         - customerCount
 *         - contactNo
 *       properties:
 *         number_of_customers:
 *           type: integer
 *           description: Number of customers making the reservation.
 *           example: 7
 *         contact_no:
 *           type: string
 *           description: The contact number for the reservation.
 *           example: '098721958799'
 *     ReservationResponse:
 *       type: object
 *       properties:
 *         booking_id:
 *           type: string
 *           description: The unique booking ID for the reservation.
 *         table_reserved_count:
 *           type: integer
 *           description: The number of tables reserved for the booking.
 *         remaining_tables_count:
 *           type: integer
 *           description: The number of remaining tables after the reservation.
 *   responses:
 *     400:
 *       description: Bad Request
 *     500:
 *       description: Internal Server Error
 */