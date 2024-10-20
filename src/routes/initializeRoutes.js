const express = require("express");
const router = express.Router();
const {initializeTables} = require("../controllers/initializeController");

/**
 * @swagger
 * /initialize-tables:
 *   post:
 *     summary: Initialize tables for reservation
 *     description: Initializes the restaurant tables with the given count.
 *     parameters:
 *       - in: body
 *         name: body
 *         description: Table count and max reserve percentage.
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             table_count:
 *               type: integer
 *               example: 66
 *             max_reserve_percentage:
 *               type: number
 *               example: 0.2
 *     responses:
 *       200:
 *         description: Tables initialized successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 table_count:
 *                   type: integer
 *                   example: 66
 *                 max_reserve_seat:
 *                   type: integer
 *                   example: 52
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
