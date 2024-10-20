const express = require("express");
const {setupMiddlewares} = require("./src/config/middleware");
const {logger, setupLogger} = require("./src/config/logger");
const {setupSwagger} = require("./src/config/swagger");
const {initializeRoutes} = require("./src/routes/initializeRoutes");

const app = express();
const PORT = process.env.PORT || 3000;
// Set up logger
setupLogger(app);

// Set up middlewares
setupMiddlewares(app);

// Swagger documentation
setupSwagger(app);

// Set up routes
initializeRoutes(app);

// Listening
app.listen(PORT, (err) => {
	err ? logger.error(`Failed to start server on port ${PORT}`, err) : logger.info(`Server is running on port ${PORT}`);
});
