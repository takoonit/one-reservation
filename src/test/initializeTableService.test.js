// /src/tests/initializeTablesService.test.js

const {initializeTablesService} = require("../services/initializeTablesService");
const {reservationStorage} = require("../storage/ReservationStorage");
const {errorTypes} = require("../utils/errorUtils");

jest.mock("../storage/ReservationStorage");

describe("initializeTablesService", () => {
    beforeEach(() => {
        // Arrange
        // Reset the storage before each test
        reservationStorage.reset();
    });

    test("should initialize tables successfully", () => {
        // Act
        // Mock before initialized
        reservationStorage.isStorageInitialized.mockReturnValue(false);
        const
            result = initializeTablesService(10, 0.5);

        // Assert
        // Ensure the initialization happens correctly
        expect(reservationStorage.initializeTables).toHaveBeenCalledWith(10, 5);
        expect(result).toEqual({
            table_count: 10,
            max_allowed_per_reservation: 5,  // 50% of 10 tables
        });
    });

    test("should throw an error if tables are already initialized", () => {
        // Already initialized
        reservationStorage.isStorageInitialized.mockReturnValue(true);

        expect(() => initializeTablesService(10, 0.5))
            .toThrow(errorTypes.TABLES_ALREADY_INITIALIZED);
    });

    test("should throw an error if tableCount is invalid (<= 0)", () => {
        // Before initialized
        reservationStorage.isStorageInitialized.mockReturnValue(false);

        expect(() => initializeTablesService(0))
            .toThrow(errorTypes.INVALID_TABLE_COUNT);
    });

    test("should throw an error if maxReservePercentage is invalid (<= 0 or > 1)", () => {
        // Before initialized
        reservationStorage.isStorageInitialized.mockReturnValue(false);

        // Test for maxReservePercentage <= 0
        expect(() => initializeTablesService(10, 0))
            .toThrow(errorTypes.INVALID_MAX_ALLOWED_PERCENTAGE);

        // Test for maxReservePercentage > 1
        expect(() => initializeTablesService(10, 1.5))
            .toThrow(errorTypes.INVALID_MAX_ALLOWED_PERCENTAGE);
    });
});
