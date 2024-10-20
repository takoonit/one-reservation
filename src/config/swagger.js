const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

/**
 * Swagger setup for the Restaurant Table Reservation API.
 * @param {Express.Application} app - The express application instance.
 */
function setupSwagger(app) {
    const swaggerSpec = swaggerJsdoc({
        definition: {
            openapi: '3.0.0',
            info: {
                title: 'Restaurant Table Reservation API',
                version: '1.0.0',
                description: 'API for managing table reservations for a restaurant.',
            },
        },
        apis: ['./src/routes/*.js', './src/controllers/*.js'], // Path to the API documentation files
    });

    // Serve the Swagger UI at the `/api-docs` route
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}

module.exports = {setupSwagger};
