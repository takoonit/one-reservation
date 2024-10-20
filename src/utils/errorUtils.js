/**
 * Custom application error class to handle specific error messages with status codes.
 * @class
 * @extends {Error}
 */
class AppError extends Error {
    /**
     * Creates an instance of AppError.
     * @param {string} message - The error message.
     * @param {number} statusCode - HTTP status code associated with the error.
     * @param {object} [extra={}] - Additional data to include with the error
     */
    constructor(message, statusCode, extra = {}) {
        super(message);
        this.statusCode = statusCode;
        this.extra = extra;
        Error.captureStackTrace(this, this.constructor);
    }
}

/**
 * Collection of predefined error messages
 */
const errorMessages = {
    TABLES_ALREADY_INITIALIZED: "Tables are already initialized.",
    INVALID_TABLE_COUNT: "Invalid table count.",
    INVALID_MAX_RESERVE_PERCENTAGE: "Invalid max_reserve_percentage.",
    INTERNAL_SERVER_ERROR: "An internal server error occurred.",
    TABLES_NOT_INITIALIZED: "Tables are not initialized yet, Please ensure to initialize the number of tables first and try again.",
    INVALID_CUSTOMER_COUNT: "Invalid customer count.",
    NOT_ENOUGH_TABLES: "Not enough tables available.",
    MAX_RESERVATION_EXCEEDED: "Requested seats exceed the allowed limit per one reservation.",
    BOOKING_NOT_FOUND: "Booking ID Not Found."
};

/**
 * Collection of predefined error types associated with their status codes.
 */
const errorTypes = {
    TABLES_ALREADY_INITIALIZED: new AppError(errorMessages.TABLES_ALREADY_INITIALIZED, 409),
    INVALID_TABLE_COUNT: new AppError(errorMessages.INVALID_TABLE_COUNT, 400),
    INVALID_MAX_ALLOWED_PERCENTAGE: new AppError(errorMessages.INVALID_MAX_RESERVE_PERCENTAGE, 400),
    INTERNAL_SERVER_ERROR: new AppError(errorMessages.INTERNAL_SERVER_ERROR, 500),
    TABLES_NOT_INITIALIZED: new AppError(errorMessages.TABLES_NOT_INITIALIZED, 409),
    INVALID_CUSTOMER_COUNT: new AppError(errorMessages.INVALID_CUSTOMER_COUNT, 400),
    NOT_ENOUGH_TABLES: new AppError(errorMessages.NOT_ENOUGH_TABLES, 400),
    MAX_RESERVATION_EXCEEDED: (extra) => new AppError(errorMessages.MAX_RESERVATION_EXCEEDED, 400, this.extra),
    BOOKING_NOT_FOUND: new AppError(errorMessages.NOT_ENOUGH_TABLES, 409)
};

module.exports = {
    AppError,
    errorMessages,
    errorTypes,
};
