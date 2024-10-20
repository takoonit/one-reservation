const {reserveTables, cancelBooking} = require("../services/reservationService");
const {reservationStorage} = require("../storage/ReservationStorage");
const {errorTypes} = require("../utils/errorUtils");
const {generateBookingId} = require("../utils/bookingUtils");

jest.mock("../utils/bookingUtils", () => ({
    generateBookingId: jest.fn(),
}));

describe("Reserve Tables Service", () => {
    beforeEach(() => {
        reservationStorage.reset(); // Reset before each test
        reservationStorage.initializeTables(100, 80); // Initialize with 100 tables, max reserve 80 seats
    });

    it("should successfully reserve tables and return booking details", async () => {
        const customerCount = 12; // Example valid customer count
        const contactNo = "1234567890";

        generateBookingId.mockReturnValue("BOOK123"); // Mock booking ID generation

        const response = await reserveTables(customerCount, contactNo);

        expect(response.booking_id).toBe("BOOK123");
        expect(response.table_reserved_count).toBe(3); // 3 tables needed for 12 customers
        expect(response.remaining_tables_count).toBe(97); // 100 tables - 3 reserved = 97 remaining
    });

    it("should throw error if the system is not initialized", async () => {
        reservationStorage.reset(); // Uninitialize storage

        await expect(reserveTables(5, "1234567890")).rejects.toThrow(errorTypes.TABLES_NOT_INITIALIZED);
    });

    it("should throw error if customer count is invalid", async () => {
        const customerCount = 0; // Invalid customer count
        const contactNo = "1234567890";

        await expect(reserveTables(customerCount, contactNo)).rejects.toThrow(errorTypes.INVALID_CUSTOMER_COUNT);
    });

    it("should throw error if customer count exceeds max reservation limit", async () => {
        const customerCount = 81; // Exceeds max allowed limit (80)
        const contactNo = "1234567890";

        await expect(reserveTables(customerCount, contactNo)).rejects.toThrow(errorTypes.MAX_RESERVATION_EXCEEDED(80));
    });

    it("should throw error if there are not enough tables available", async () => {
        reservationStorage.reset(); // Reset before each test
        reservationStorage.initializeTables(100, 0);
        const customerCount = 500; // More than available tables (125 tables needed for 500 customers)
        const contactNo = "1234567890";

        await expect(reserveTables(customerCount, contactNo)).rejects.toThrow(errorTypes.NOT_ENOUGH_TABLES);
    });
});

describe('Cancel Booking Service', () => {

    beforeEach(() => {
        reservationStorage.reset();
        reservationStorage.initializeTables(100, 80); // Initialize with 100 tables, 80 max reserve limit
    });

    test('should successfully cancel a booking and free tables (4 customers)', async () => {
        // Mock a booking to cancel
        const bookingId = 'BOOKING-1234';
        const customerCount = 4;
        const tablesReserved = Math.ceil(customerCount / 4);
        reservationStorage.addBooking(bookingId, tablesReserved, customerCount, '1234567890');

        const result = await cancelBooking(bookingId);

        expect(result).toEqual({
            freed_tables_count: tablesReserved,
            remaining_table_count: 100,
        });
    });

    test('should successfully cancel a booking and free tables (6 customers)', async () => {
        // Mock a booking to cancel
        const bookingId = 'BOOKING-1234';
        const customerCount = 6;
        const tablesReserved = Math.ceil(customerCount / 4);
        reservationStorage.addBooking(bookingId, tablesReserved, customerCount, '1234567890');

        const result = await cancelBooking(bookingId);

        expect(result).toEqual({
            freed_tables_count: tablesReserved,
            remaining_table_count: 100,
        });
    });

    test('should successfully cancel a booking and free tables (10 customers)', async () => {
        // Mock a booking to cancel
        const bookingId = 'BOOKING-1234';
        const customerCount = 10;
        const tablesReserved = Math.ceil(customerCount / 4);
        reservationStorage.addBooking(bookingId, tablesReserved, customerCount, '1234567890');

        const result = await cancelBooking(bookingId);

        expect(result).toEqual({
            freed_tables_count: tablesReserved,
            remaining_table_count: 100,
        });
    });

    test('should successfully cancel a booking and free tables (80 customers)', async () => {
        // Mock a booking to cancel
        const bookingId = 'BOOKING-1234';
        const customerCount = 80;
        const tablesReserved = Math.ceil(customerCount / 4);
        reservationStorage.addBooking(bookingId, tablesReserved, customerCount, '1234567890');

        const result = await cancelBooking(bookingId);

        expect(result).toEqual({
            freed_tables_count: tablesReserved,
            remaining_table_count: 100,
        });
    });
    test('should handle multiple bookings and cancelling just one correctly', async () => {
        // Mock multiple bookings
        const booking1 = {id: 'BOOK-1', tableCount: 2, customerCount: 6, contactNo: '1234567890'};
        const booking2 = {id: 'BOOK-2', tableCount: 3, customerCount: 10, contactNo: '0987654321'};

        reservationStorage.addBooking(booking1.id, booking1.tableCount, booking1.customerCount, booking1.contactNo);
        reservationStorage.addBooking(booking2.id, booking2.tableCount, booking2.customerCount, booking2.contactNo);

        const result = await cancelBooking(booking1.id);

        expect(result).toEqual({
            freed_tables_count: booking1.tableCount,
            remaining_table_count: 97,  // 100 - (3 tables reserved by booking2)
        });

        const remainingBookings = reservationStorage.bookings;
        expect(remainingBookings).toHaveProperty(booking2.id);
        expect(remainingBookings[booking2.id].contactNo).toBe(booking2.contactNo); // Booking2 should still be present
    });
    test('should throw an error if booking ID does not exist', async () => {
        const bookingId = 'NON_EXISTENT_BOOKING';

        try {
            await cancelBooking(bookingId);
        } catch (err) {
            expect(err).toBe(errorTypes.BOOKING_NOT_FOUND);
        }
    });

    test('should handle server error gracefully (edge case)', async () => {
        // Simulate server error by throwing a manual error
        const bookingId = 'BOOKING-5678';
        jest.spyOn(reservationStorage, 'retrieveBookingById').mockImplementation(() => {
            throw new Error('Server Error');
        });

        try {
            await cancelBooking(bookingId);
        } catch (err) {
            expect(err.message).toBe('Server Error');
        }
    });


});