const {reserveTables, cancelBooking} = require("../services/reservationService");
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
/**
 * Controller to handle the cancel booking request.
 */
const cancelBookingController = async (req, res) => {
 try {
  const {booking_id} = req.params;

  logger.info(`Cancel booking request received: booking ID ${booking_id}`);

  const result = await cancelBooking(booking_id);

  logger.info(`Booking cancelled successfully: ${JSON.stringify(result)}`);

  return res.status(200).json(result);
 } catch (error) {
  logger.error(`Cancellation failed: ${error.message}`);
  return res.status(error.statusCode || 500).json({error: error.message});
 }
};
module.exports = {reservationController, cancelBookingController};

/**
 * @swagger
 * tags:
 *   name: Reservations
 *   description: The reservation API to manage table bookings
 */
/**
 * @swagger
 * /api/reserve:
 *   post:
 *     summary: Reserve tables for customers.
 *     tags: [Reservations]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Reservation'
 *     responses:
 *       200:
 *         description: Reservation successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ReservationResponse'
 *       400:
 *         $ref: '#/components/responses/400'
 *       500:
 *         $ref: '#/components/responses/500'
 */
/**
 * @swagger
 * /api/reserve/{booking_id}:
 *   delete:
 *     summary: Cancel a reservation by booking ID.
 *     tags: [Reservations]
 *     parameters:
 *       - in: path
 *         name: booking_id
 *         required: true
 *         description: The booking ID to cancel.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Booking canceled successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 freed_tables_count:
 *                   type: integer
 *                   description: Number of freed tables.
 *                   example: 5
 *                 remaining_table_count:
 *                   type: integer
 *                   description: Remaining tables after cancellation.
 *                   example: 10
 *       400:
 *         description: Invalid booking ID or bad request.
 *       409:
 *         description: Booking ID not found.
 *       500:
 *         description: Internal server error.
 */
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
