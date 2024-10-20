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
        this.tableCount = tableCount;
        this.maxReserveSeats = maxReserveSeats;
        this._isInitialized = true;
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
    }
}

// Singleton instance
const reservationStorage = new ReservationStorage();

module.exports = {reservationStorage};
