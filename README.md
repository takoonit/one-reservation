# One Reservation

A simple table reservation system built with Node.js, Express.js, and Kafka. This system demonstrates a microservice and
event-driven architecture for managing table reservations with high concurrency and reliability.

## Features

- **Table Management:** Manages table availability and booking.
- **Reservation Creation:** Allows customers to reserve tables.
- **Reservation Cancellation:** Cancel bookings and free up tables.
- **Kafka Event-Driven:** Event-driven architecture for handling reservation events and ensuring consistency between
  microservices.
- **High Performance:** Optimized for handling high concurrency with in-memory storage and Kafka for decoupling
  microservices.
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

3. Start the application:

```bash
pnpm start
```

### Start the application using Docker:

1. Build the Docker image:

```bash
docker build -t one_reservation .
```

2. Run the Docker container:

```bash
docker run -p 3000:3000 --name one_reservation one_reservation
```

### Access the API documentation:

Open your web browser and navigate to http://localhost:3000/api-docs.

### Components:

API Gateway (Node.js/Express.js): Handles incoming requests and routes them to the appropriate services.
Reservation Service: Manages table reservations, availability, and cancellations.
In-Memory Storage: Stores reservation data temporarily during runtime.
Swagger UI: Provides interactive API documentation.

### Design Patterns

**Singleton**: Ensures a single instance of the in-memory storage for consistent data access.

**Facade Pattern**: Simple interface to a complex subsystem.

**Controller-Service Pattern**: Splits the responsibility of handling HTTP requests and doing the business logic.

##### License

This project is licensed under the MIT License.
