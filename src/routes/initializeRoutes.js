const express = require("express");
const router = express.Router();
const {initializeTables} = require("../controllers/initializeTablesController");


/**
 * @swagger
 * components:
 *   schemas:
 *     InitializeTablesRequest:
 *       type: object
 *       required:
 *         - table_count
 *         - max_reserve_percentage
 *       properties:
 *         table_count:
 *           type: integer
 *           description: Number of available tables
 *           example: 66
 *         max_reserve_percentage:
 *           type: number
 *           description: Maximum reserve limit- X% of tables (e.g., 0.2 is 20%)
 *           example: 0.2
 *     InitializeTablesResponse:
 *       type: object
 *       properties:
 *         table_count:
 *           type: integer
 *           description: Number of available tables
 *           example: 66
 *         max_reserve_seat:
 *           type: integer
 *           description: Maximum seat reserve limit per request
 *           example: 52
 */

/**
 * @swagger
 * /initialize-tables:
 *   post:
 *     summary: Initialize tables for reservation
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
router.post("/initialize-tables", initializeTables);

const initializeRoutes = (app) => {
 app.use("/api", router);
};

module.exports = {initializeRoutes};