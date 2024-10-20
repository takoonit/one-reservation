const {initializeTablesService} = require("../services/initializeTablesService");
const {logger} = require("../config/logger");
const {errorTypes, throwError} = require("../utils/errorUtils");

/**
 * Handles the initialization of tables.
 */
const initializeTables = (req, res) => {
 const {table_count, max_allowed_percentage} = req.body;

 try {
  // Call the service to initialize tables
  const result = initializeTablesService(table_count, max_allowed_percentage);

  // Return success response
  res.status(200).json(result);
 } catch (error) {
  // Log the error and send appropriate response
  logger.error(error.message);
  res.status(error.statusCode || 500).json({message: error.message});
 }
};

module.exports = {initializeTables};
/**
 * @swagger
 * components:
 *   schemas:
 *     InitializeTablesRequest:
 *       type: object
 *       required:
 *         - table_count
 *       properties:
 *         table_count:
 *           type: integer
 *           description: Number of available tables
 *           example: 66
 *         max_allowed_percentage:
 *           type: number
 *           description: Maximum reserve limit- X% of tables (e.g., 0.2 is 20%)
 *           example: 0.2
 *     InitializeTablesResponse:
 *       type: object
 *       properties:
 *         table_count:
 *           type: integer
 *           description: Number of available tables
 *           example: 66
 *         max_allowed_per_reservation:
 *           type: integer
 *           description: Maximum seat allowed per reservation.
 *           example: 52
 */