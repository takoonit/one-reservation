const express = require("express");
const router = express.Router();

/* GET reserved table listing. */
router.get("/", (_req, res, _next) => {
	res.send("respond with a resource");
});

module.exports = router;
