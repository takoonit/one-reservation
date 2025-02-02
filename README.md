# One Reservation

A simple table reservation system built with Node.js, Express.js, and Kafka. This system demonstrates a microservice and
event-driven architecture for managing table reservations with high concurrency and reliability.

Takoon Chiengtong

## Features

- **Table Management:** Manages table availability and booking.
- **Reservation Creation:** Allows customers to reserve tables.
- **Reservation Cancellation:** Cancel bookings and free up tables.
- **API Documentation:** Auto-generated using Swagger UI, serving a static `swagger.json` for easy API exploration.

## Getting Started

### Prerequisites

- Node.js (v20.x or higher)
- pnpm or yarn
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

Open your web browser and navigate to [http://localhost:3000/api-docs](http://localhost:3000/api-docs).

## Design Patterns

- **Singleton**: Ensures a single instance of the in-memory storage for consistent data access.
- **Facade**: Provides a simple interface to a complex subsystem.
- **Controller-Service**: Splits the responsibility of handling HTTP requests and performing business logic.

## License

This project is licensed under the MIT License.