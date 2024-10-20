const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");


// Middleware setup function
function setupMiddlewares(app) {
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({extended: true}));
	app.use(cors());
	app.use(morgan("dev"));
}

module.exports = {setupMiddlewares};
