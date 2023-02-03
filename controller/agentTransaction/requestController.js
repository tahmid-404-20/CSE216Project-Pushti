const express = require("express");
const router = express.Router();
const requestShower = require("../requestShower");
const requestUpdater = require("./requestUpdater");

router.use("/", requestShower);
// router.use("/update-request", requestUpdater);

module.exports = router;
