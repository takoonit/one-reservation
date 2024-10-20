const {reservationStorage} = require("../storage/reservationStorage");
const {errorTypes} = require("../utils/errorUtils");
const {logger} = require("../config/logger");

/**
 * Initializes the table configuration in the restaurant.
 * Throws an error if tables are already initialized or if invalid input is provided.
 *
 * @param {number} tableCount - The number of tables to initialize.
 * @param {number} [maxAllowedPercentage=1.0] - Maximum reserve limit as a percentage of total tables (default is 100%).
 * @returns {Object} - An object containing the total table count and max reserve seats.
 * @throws {AppError} - Throws error if tables are already initialized or if input is invalid.
 */
function initializeTablesService(tableCount, maxAllowedPercentage = 1.0) {
    logger.info("Initializing tables with count: " + tableCount + " and maxAllowedPercentage: " + maxAllowedPercentage);

    if (reservationStorage.isInitialized()) {
        logger.error("Tables are already initialized");
        throw errorTypes.TABLES_ALREADY_INITIALIZED;
    }

    if (tableCount <= 0) {
        logger.error("Invalid table count provided: " + tableCount);
        throw errorTypes.INVALID_TABLE_COUNT;
    }

    if (maxAllowedPercentage <= 0 || maxAllowedPercentage > 1) {
        logger.error("Invalid max allowed percentage: " + maxAllowedPercentage);
        throw errorTypes.INVALID_MAX_ALLOWED_PERCENTAGE;
    }

    const maxReserveSeats = Math.floor(tableCount * maxAllowedPercentage);

    // Initialize tables and set max reserve seats based on the given percentage
    reservationStorage.initialize(tableCount, maxReserveSeats);

    logger.info("Tables initialized successfully with count: " + tableCount + " and maxAllowedPercentage: " + maxAllowedPercentage);

    return {
        table_count: tableCount,
        max_allowed_per_reservation: maxReserveSeats,
    };
}

module.exports = {
    initializeTablesService,
};