const express = require("express");
const router = express.Router();
const {initializeTables} = require("../controllers/initializeTablesController");
const {reservationController, cancelBookingController} = require("../controllers/reservationController");

router.post("/initialize-tables", initializeTables);
router.post("/reserve", reservationController);
router.delete("/reserve/:booking_id", cancelBookingController);

const initializeRoutes = (app) => {
    app.use("/api", router);
};

module.exports = {initializeRoutes};