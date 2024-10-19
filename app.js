const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");
const routes = require("./src/routes");
const { setupMiddlewares } = require("./src/config/middleware");
const { setupKafka } = require("./src/config/kafka");

const app = express();

// Set up middlewares
setupMiddlewares(app);

// Swagger documentation
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Set up routes
app.use(routes);

// Set up Kafka event handling
//setupKafka(app);

// Export app for testing
app.listen(process.env.PORT || 3000, () => {
	console.log("server is running on port $PORT");
});
module.exports = app;
