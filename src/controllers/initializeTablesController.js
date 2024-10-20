const {initializeTablesService} = require("../services/initializeTablesService");
const {logger} = require("../config/logger");
const {errorTypes, throwError} = require("../utils/errorUtils");

/**
 * Handles the initialization of tables.
 */
const initializeTables = (req, res) => {
    const {table_count, max_reserve_percentage} = req.body;

    try {
        // Call the service to initialize tables
        const result = initializeTablesService(table_count, max_reserve_percentage);

        // Return success response
        res.status(200).json(result);
    } catch (error) {
        // Log the error and send appropriate response
        logger.error(error.message);
        res.status(error.statusCode || 500).json({message: error.message});
    }
};

module.exports = {initializeTables};
