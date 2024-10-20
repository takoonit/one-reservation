const request = require('supertest');
const express = require("express");
const {reserveTables, cancelBooking} = require('../services/reservationService');
const {reservationStorage} = require('../storage/ReservationStorage');
const {errorTypes} = require('../utils/errorUtils');
const {reservationController, cancelBookingController} = require("../controllers/reservationController");

// Mock the service layer
jest.mock('../services/reservationService');

const app = express();
app.use(express.json());
app.post("/reserve", reservationController);
app.delete("/reserve/:booking_id", cancelBookingController);
let server;

beforeAll(() => {
    // Start the server before all tests
    server = app.listen(7000, () => {
        console.log("Test server running on port 7000");
    });
});

afterAll(async () => {
    // Close the server after all tests
    await new Promise(resolve => server.close(resolve));
});
describe('Reserve Controller', () => {

    beforeEach(() => {
        reservationStorage.reset();
        reservationStorage.initializeTables(100, 80);  // 100 tables, max 80 seats for reservation
    });

    test('should return 200 and reserve tables successfully', async () => {
        const mockReservationResponse = {
            booking_id: 'BOOKING-1234',
            table_reserved_count: 5,
            remaining_tables_count: 95
        };

        // Mock the service response
        reserveTables.mockResolvedValue(mockReservationResponse);

        const response = await request(app)
            .post('/reserve')
            .send({
                number_of_customers: 10,
                contact_no: '1234567890'
            });

        expect(response.status).toBe(200);
        expect(response.body).toEqual(mockReservationResponse);
    });

    test('should return 400 for invalid customer count (edge case)', async () => {
        const invalidCustomerCountError = errorTypes.INVALID_CUSTOMER_COUNT;

        reserveTables.mockRejectedValue(invalidCustomerCountError);

        const response = await request(app)
            .post('/reserve')
            .send({
                number_of_customers: 0,  // Invalid count
                contact_no: '1234567890'
            });

        expect(response.status).toBe(400);
        expect(response.body.message).toBe(invalidCustomerCountError.message);
    });

    test('should return 409 for exceeding max reservation limit (edge case)', async () => {
        const maxReserveExceededError = errorTypes.MAX_RESERVATION_EXCEEDED({maxAllowedSeats: 80});

        reserveTables.mockRejectedValue(maxReserveExceededError);

        const response = await request(app)
            .post('/reserve')
            .send({
                number_of_customers: 100,  // Exceeding max reserve seats
                contact_no: '1234567890'
            });

        expect(response.status).toBe(409);   // Assert status first
        expect(response.body.message).toBe(maxReserveExceededError.message);
    });

    test('should return 500 for internal server error (edge case)', async () => {
        const internalServerError = errorTypes.INTERNAL_SERVER_ERROR;

        reserveTables.mockRejectedValue(internalServerError);

        const response = await request(app)
            .post('/reserve')
            .send({
                number_of_customers: 5,
                contact_no: '1234567890'
            });

        expect(response.status).toBe(500);
        expect(response.body.message).toBe(internalServerError.message);
    });

});

describe('Cancel Booking Controller', () => {

    beforeEach(() => {
        jest.clearAllMocks();  // Clears any previous mocks between test cases
    });

    test('should return 200 and successfully cancel a booking', async () => {
        const mockCancelResponse = {
            freed_tables_count: 3,
            remaining_table_count: 97
        };

        // Mock the service response
        cancelBooking.mockResolvedValueOnce(mockCancelResponse);

        const response = await request(app)
            .delete('/reserve/BOOKING-1234')
            .send();

        expect(response.status).toBe(200);
        expect(response.body).toEqual(mockCancelResponse);
    });
});

