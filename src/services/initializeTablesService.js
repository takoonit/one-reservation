const {reservationStorage} = require("../storage/reservationStorage");
const {errorTypes} = require("../utils/errorUtils");

/**
 * Initializes the table configuration in the restaurant.
 * Throws an error if tables are already initialized or if invalid input is provided.
 *
 * @param {number} tableCount - The number of tables to initialize.
 * @param {number} [maxReservePercentage=1.0] - Maximum reserve limit as a percentage of total tables (default is 100%).
 * @returns {Object} - An object containing the total table count and max reserve seats.
 * @throws {AppError} - Throws error if tables are already initialized or if input is invalid.
 */
function initializeTablesService(tableCount, maxReservePercentage = 1.0) {
    if (reservationStorage.isInitialized()) {
        throw errorTypes.TABLES_ALREADY_INITIALIZED;
    }

    if (tableCount <= 0) {
        throw errorTypes.INVALID_TABLE_COUNT;
    }

    if (maxReservePercentage <= 0 || maxReservePercentage > 1) {
        throw errorTypes.INVALID_MAX_RESERVE_PERCENTAGE;
    }

    const maxReserveSeats = Math.floor(tableCount * maxReservePercentage);

    // Initialize tables and set max reserve seats based on the given percentage
    reservationStorage.initialize(tableCount, maxReserveSeats);

    return {
        table_count: tableCount,
        max_reserve_seat: maxReserveSeats,
    };
}

module.exports = {
    initializeTablesService,
};
