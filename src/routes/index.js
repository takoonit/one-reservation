const express = require("express");
//const reserveController = require('../controllers/reserveController');

const router = express.Router();

// Define routes
// router.post('/initialize-empty-tables', reserveController.initializeTables);
// router.post('/reserve-tables', reserveController.reserveTables);
// router.delete('/reserve/:bookingId', reserveController.cancelReservation);

// Health check
router.get("/", (_req, res) => {
	res.send("OK");
});

module.exports = router;
