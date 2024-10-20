const {initializeTables} = require('../controllers/initializeController');

function initializeRoutes(app) {
    /**
     * @openapi
     * /initialize-tables:
     *   post:
     *     summary: Initialize tables in the restaurant
     *     description: Initializes the number of tables and the maximum seat reservation limit.
     *     operationId: initializeTables
     *     tags:
     *       - Table Management
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               table_count:
     *                 type: integer
     *               max_reserve_percentage:
     *                 type: number
     *                 format: float
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
     *                 max_reserve_seat:
     *                   type: integer
     *       400:
     *         description: Bad request.
     *       409:
     *         description: Tables already initialized.
     *       500:
     *         description: Internal server error.
     */
    app.post('/initialize-tables', initializeTables);
}

module.exports = {initializeRoutes};
