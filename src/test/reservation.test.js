const request = require("supertest");
const app = require("../app");
// const reservationService = require('../services/reservationService');
// jest.mock('../services/reservationService');

describe("Reservation API", () => {
	it("should initialize tables successfully", async () => {
		// Arrange
		// Act: Call the service to initialze  tables
		// Assert: Verify table count
	});
	it("should reserve tables successfully", async () => {
		// Arrange
		// Act: Call the service to reserve a table
		// Assert: Verify booking_id, booked tables, remaining tables
	});
	it("should cancel reservation successfully", async () => {
		// Arrange
		// Act: Call the service to cancel a table
		// Assert: Verify booking_id, booked tables, remaining tables
	});
	// some edge cases
});
