const request = require("supertest");
const express = require("express");
const {initializeTables} = require("../controllers/initializeTablesController");
const {initializeTablesService} = require("../services/initializeTablesService");
const {errorTypes} = require("../utils/errorUtils");

jest.mock("../services/initializeTablesService");

const app = express();
app.use(express.json());
app.post("/initialize-tables", initializeTables);
let server;

beforeAll(() => {
    // Start the server before all tests
    server = app.listen(7000, () => {
        console.log("Test server running on port 3000");
    });
});

afterAll(() => {
    // Close the server after all tests
    server.close();
});

describe("POST /initialize-tables", () => {
    afterAll(() => {
        jest.clearAllMocks();
    });
    it("should successfully initialize tables", async () => {
        // Arrange:
        // Mock the service response
        const mockResponse = {
            table_count: 66,
            max_allowed_per_reservation: 13,
        };

        initializeTablesService.mockReturnValueOnce(mockResponse);

        // Act:
        // Call the service to initialize tables
        const response = await request(app)
            .post("/initialize-tables")
            .send({
                table_count: 66,
                max_allowed_percentage: 0.2,
            });

        // Assert:
        // Verify table count,  max_allowed_per_reservation and http status
        expect(response.status).toBe(200);
        console.log(response.body);
        expect(response.body.table_count).toBe(66);
        expect(response.body.max_allowed_per_reservation).toBe(13);
    });

    it("should return error if table count is invalid", async () => {
        // Arrange:
        // Mock the service to throw error for invalid table count
        initializeTablesService.mockImplementationOnce(() => {
            throw errorTypes.INVALID_TABLE_COUNT;
        });

        // Act:
        // Call the service to initialize tables
        const response = await request(app)
            .post("/initialize-tables")
            .send({
                table_count: -10,  // Invalid count
            });

        // Assert:
        // Verify error
        expect(response.body.message).toBe(errorTypes.INVALID_TABLE_COUNT.message);
        expect(response.status).toBe(errorTypes.INVALID_TABLE_COUNT.statusCode);
    });

    it("should return error if tables are already initialized", async () => {
        // Arrange:
        // Mock the service to throw error if tables are already initialized
        initializeTablesService.mockImplementationOnce(() => {
            throw errorTypes.TABLES_ALREADY_INITIALIZED;
        });

        // Act:
        // Call the service to initialize tables
        const response = await request(app)
            .post("/initialize-tables")
            .send({
                table_count: 66,
            });

        // Assert:
        // Verify error
        expect(response.status).toBe(errorTypes.TABLES_ALREADY_INITIALIZED.statusCode);
        expect(response.body.message).toBe(errorTypes.TABLES_ALREADY_INITIALIZED.message);
    });

    it("should return error if max_allowed_percentage is invalid", async () => {
        // Arrange:
        // Mock the service to throw error for invalid max_allowed_percentage
        initializeTablesService.mockImplementationOnce(() => {
            throw errorTypes.INVALID_MAX_ALLOWED_PERCENTAGE;
        });

        // Act:
        // Call the service to initialize tables
        const response = await request(app)
            .post("/initialize-tables")
            .send({
                table_count: 66,
                max_allowed_percentage: 2,  // Invalid percentage
            });

        // Assert:
        // Verify error
        expect(response.status).toBe(errorTypes.INVALID_MAX_ALLOWED_PERCENTAGE.statusCode);
        expect(response.body.message).toBe(errorTypes.INVALID_MAX_ALLOWED_PERCENTAGE.message);
    });
});