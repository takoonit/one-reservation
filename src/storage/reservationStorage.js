const {errorTypes} = require("../utils/errorUtils");

class ReservationStorage {
    constructor() {
        this.reset();
    }

    /**
     * Initialize the storage with table count and max reserve seats.
     * @param {number} tableCount - Total number of available tables.
     * @param {number} maxReserveSeats - Maximum number of reserve seats allowed.
     */
    initialize(tableCount, maxReserveSeats) {
        if (typeof tableCount !== 'number' || typeof maxReserveSeats !== 'number' || tableCount <= 0 || maxReserveSeats < 0) {
            throw new Error("Invalid parameters for initialization.");
        }
        this.tableCount = tableCount;
        this.availableTableCount = tableCount;
        this.maxReserveSeats = maxReserveSeats;
        this.isCheckMaxReserved = maxReserveSeats > 0;
        this._isInitialized = true;
    }

    /**
     * Store Booking data.
     * @param {string} bookingId - Unique Booking ID.
     * @param {number} tablesReserved - Number of tables reserved.
     * @param {number} customerCount - The number of customers wanting to reserve tables.
     * @param {string} contactNo - Contact Number.
     */
    addBooking(bookingId, tablesReserved, customerCount, contactNo) {
        if (!this._isInitialized) {
            throw errorTypes.TABLES_NOT_INITIALIZED;
        }
        if (tablesReserved > this.availableTableCount) {
            throw errorTypes.NOT_ENOUGH_TABLES;
        }
        this.availableTableCount -= tablesReserved;
        this.bookings[bookingId] = {tablesReserved, customerCount, contactNo};
    }

    /**
     * Check if the reservation storage is already initialized.
     * @returns {boolean}
     */
    isInitialized() {
        return this._isInitialized;
    }

    /**
     * Get the total number of tables.
     * @returns {number} - Total number of tables.
     */
    getTableCount() {
        return this.tableCount;
    }

    /**
     * Get the total number of availables tables.
     * @returns {number} - Total number of empty tables.
     */
    getAvailableTableCount() {
        return this.availableTableCount;
    }

    /**
     * Get the maximum reserve seats allowed.
     * @returns {number} - Maximum number of reserve seats.
     */
    getMaxReserveSeats() {
        return this.maxReserveSeats;
    }

    /**
     * Reset the storage.
     */
    reset() {
        this.tableCount = 0;
        this.maxReserveSeats = 0;
        this._isInitialized = false;
        this.bookings = {}; // Store bookings by bookingId
        this.availableTableCount = 0;
    }
}

// Singleton instance
const reservationStorage = new ReservationStorage();

module.exports = {reservationStorage};