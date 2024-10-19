// const kafkaProducer = require("../events/kafkaProducer");
// const reservationService = require("../services/reservationService");
// const { KafkaClient, MockProducer } = require('kafka-node');

// // Mock Kafka Producer
// jest.mock("../events/kafkaProducer");
// jest.mock("../services/reservationService");
// jest.mock("../utils/logger");

describe("Kafka Producer", () => {
	beforeEach(() => {
		jest.clearAllMocks(); // Clear mocks before each test
	});

	it("should send Kafka event when reservation is made", async () => {
		// Arrange
		// Act: Call the service to reserve a table
		// Assert: Verify Kafka event was sent
	});

	it("should send Kafka event when cancel a reservation", async () => {
		// Arrange
		// Act: Call the service to cancel a reservation
		// Assert: Verify Kafka event was sent
	});
	//Some edge cases.
});
