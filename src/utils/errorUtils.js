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
     */
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        Error.captureStackTrace(this, this.constructor);
    }
}

/**
 * Collection of predefined error messages
 */
const errorMessages = {
    TABLES_ALREADY_INITIALIZED: "Tables are already initialized",
    INVALID_TABLE_COUNT: "Invalid table count",
    INVALID_MAX_RESERVE_PERCENTAGE: "Invalid max_reserve_percentage",
    INTERNAL_SERVER_ERROR: "An internal server error occurred",
};

/**
 * Collection of predefined error types associated with their status codes.
 */
const errorTypes = {
    TABLES_ALREADY_INITIALIZED: new AppError(errorMessages.TABLES_ALREADY_INITIALIZED, 409),
    INVALID_TABLE_COUNT: new AppError(errorMessages.INVALID_TABLE_COUNT, 400),
    INVALID_MAX_RESERVE_PERCENTAGE: new AppError(errorMessages.INVALID_MAX_RESERVE_PERCENTAGE, 400),
    INTERNAL_SERVER_ERROR: new AppError(errorMessages.INTERNAL_SERVER_ERROR, 500),
};

module.exports = {
    AppError,
    errorMessages,
    errorTypes,
};
