# One Reservation

A simple table reservation system built with Node.js, Express.js, and Kafka. This system demonstrates a microservice and event-driven architecture for managing table reservations with high concurrency and reliability.

## Features

- **Table Management:** Manages table availability and booking.
- **Reservation Creation:** Allows customers to reserve tables.
- **Reservation Cancellation:** Cancel bookings and free up tables.
- **Kafka Event-Driven:** Event-driven architecture for handling reservation events and ensuring consistency between microservices.
- **High Performance:** Optimized for handling high concurrency with in-memory storage and Kafka for decoupling microservices.
- **API Documentation:** Auto-generated using Swagger UI, serving a static `swagger.json` for easy API exploration.

## Getting Started

### Prerequisites

- Node.js (v20.x or higher)
- npm or yarn
- Docker and Docker Compose

### Installation

1. Clone the repository:

```bash
git clone https://github.com/takoonit/one-reservation.git
cd one-reservation
```
2. Install dependencies:
```bash
pnpm install
```
Start the application using Docker Compose:
```bash
docker-compose up -d
```
This will start the Node.js server, Kafka, and Zookeeper containers.

### Access the API documentation:
Open your web browser and navigate to http://localhost:3000/api-docs.

### Architecture
The system follows a microservice architecture with an event-driven approach using Kafka as the message broker.

### Components:

API Gateway (Node.js/Express.js): Handles incoming requests and routes them to the appropriate services.
Reservation Service: Manages table reservations, availability, and cancellations.
Kafka: Acts as the message broker for asynchronous communication between services.
In-Memory Storage: Stores reservation data temporarily during runtime.
Swagger UI: Provides interactive API documentation.

### API Documentation
The API documentation is available at http://localhost:3000/api-docs when the application is running.

### Design Patterns
**Singleton**: Ensures a single instance of the in-memory storage for consistent data access.

**Repository**: Abstracts data access logic for easier testing and maintainability.

**Observer**: Notifies consumers of reservation events (creation, cancellation) via Kafka.

**Factory**: Creates instances of services (Kafka producer/consumer) based on configuration.

**Event-Driven Architecture**: Actions trigger events published to Kafka, enabling asynchronous processing and decoupling of services.
### Workflow Examples

#### Booking a Table:

```
1. User sends a reservation request.
2. API publishes a "create reservation" event to Kafka.
3. Reservation service consumes the event, updates storage, 
and confirms the booking.
```
#### Canceling a Reservation:
```
1. User requests cancellation.
2. System publishes a "cancel reservation" event.
3. Relevant services (e.g., reservation service, notification service)
 consume the event and take appropriate actions.
```

##### License
This project is licensed under the MIT License.
