const {reservationStorage} = require("../storage/ReservationStorage");
const {errorTypes} = require("../utils/errorUtils");
const {generateBookingId} = require("../utils/bookingUtils");
const {logger} = require("../config/logger");

/**
 * Service function to handle table reservations based on the customer count.
 * @param {number} customerCount - The number of customers.
 * @param {string} contactNo - Contact Number.
 * @returns {object} - Reservation details.
 * @throws {AppError} - Throws an error if reservation cannot be made (e.g., not enough tables, invalid count).
 */
const reserveTables = async (customerCount, contactNo) => {
	// Validate missing parameters
	if (typeof customerCount === 'undefined' || typeof contactNo === 'undefined') {
		throw errorTypes.MISSING_PARAMETERS;
	}

	// Check if the system is initialized
	if (!reservationStorage.isStorageInitialized()) {
		throw errorTypes.TABLES_NOT_INITIALIZED;
	}

	// Validate customer count
	if (customerCount <= 0) {
		throw errorTypes.INVALID_CUSTOMER_COUNT;
	}

	if (reservationStorage.isCheckMaxReserved) {
		// Check if number of customer exceed allowed limit for one reservation.
		const maxAllowedSeats = reservationStorage.getMaxSeatsReservable();

		if (customerCount > maxAllowedSeats)
			throw errorTypes.MAX_RESERVATION_EXCEEDED({maxAllowedSeats});
	}
	// Calculate how many tables are needed (assuming 4 seats per table)
	const tablesNeeded = Math.ceil(customerCount / 4);
	const availableTables = reservationStorage.getEmptyTableCount();

	// Check if there are enough available tables
	if (tablesNeeded > availableTables) {
		throw errorTypes.NOT_ENOUGH_TABLES;
	}

	// Generate a booking ID using the utility
	const bookingId = generateBookingId();
	await reservationStorage.addBooking(
		bookingId,
		tablesNeeded,
		customerCount,
		contactNo,
	);

	// Return the result
	return {
		booking_id: bookingId,
		table_reserved_count: tablesNeeded,
		remaining_tables_count: reservationStorage.getEmptyTableCount(),
	};
};

/**
 * Service function to cancel a booking by booking ID.
 * @param {string} bookingId - The booking ID to cancel.
 * @returns {object} - Details of the cancellation.
 * @throws {AppError} - Throws an error if the booking is not found.
 */
const cancelBooking = async (bookingId) => {
	// Validate missing parameters
	if (typeof bookingId === 'undefined') {
		throw errorTypes.MISSING_PARAMETERS;
	}

	// Check if the system is initialized
	if (!reservationStorage.isStorageInitialized()) {
		throw errorTypes.TABLES_NOT_INITIALIZED;
	}

	const booking = reservationStorage.retrieveBookingById(bookingId);

	if (!booking) {
		throw errorTypes.BOOKING_NOT_FOUND;
	}

	// Free the reserved tables
	reservationStorage.releaseTablesByBookingId(bookingId);

	return {
		freed_tables_count: booking.tablesReserved,
		remaining_table_count: reservationStorage.getEmptyTableCount(),
	};
};

module.exports = {reserveTables, cancelBooking};