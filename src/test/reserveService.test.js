const {reserveTables} = require("../services/reserveService");
const {reservationStorage} = require("../storage/reservationStorage");
const {errorTypes} = require("../utils/errorUtils");
const {generateBookingId} = require("../utils/bookingUtils");

jest.mock("../utils/bookingUtils", () => ({
    generateBookingId: jest.fn(),
}));

describe("ReserveService - reserveTables", () => {
    beforeEach(() => {
        reservationStorage.reset(); // Reset before each test
        reservationStorage.initialize(100, 80); // Initialize with 100 tables, max reserve 80 seats
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
        reservationStorage.initialize(100, 0);
        const customerCount = 500; // More than available tables (125 tables needed for 500 customers)
        const contactNo = "1234567890";

        await expect(reserveTables(customerCount, contactNo)).rejects.toThrow(errorTypes.NOT_ENOUGH_TABLES);
    });
});
