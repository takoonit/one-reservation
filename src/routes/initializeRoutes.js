const express = require("express");
const router = express.Router();
const {initializeTables} = require("../controllers/initializeTablesController");
const {reservationController} = require("../controllers/reservationController");

router.post("/reserve", reservationController);
router.post("/initialize-tables", initializeTables);

const initializeRoutes = (app) => {
 app.use("/api", router);
};

module.exports = {initializeRoutes};
/**
 * @swagger
 * tags:
 *   name: Initialization
 *   description: The reservation API for initialize data.
 */

/**
 * @swagger
 * /api/initialize-tables:
 *   post:
 *     summary: Initialize tables for reservation
 *     tags: [Initialization]
 *     description: Initializes the restaurant tables with the given count.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/InitializeTablesRequest'
 *     responses:
 *       200:
 *         description: Tables initialized successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/InitializeTablesResponse'
 *       400:
 *         description: Bad request, invalid input.
 *       409:
 *         description: Conflict, tables already initialized.
 *       500:
 *         description: Internal server error.
 */

/**
 * @swagger
 * tags:
 *   name: Reservations
 *   description: The reservation API to manage table bookings
 */

/**
 * @swagger
 * /api/reserve:
 *   post:
 *     summary: Reserve tables for customers.
 *     tags: [Reservations]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Reservation'
 *     responses:
 *       200:
 *         description: Reservation successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ReservationResponse'
 *       400:
 *         $ref: '#/components/responses/400'
 *       500:
 *         $ref: '#/components/responses/500'
 */