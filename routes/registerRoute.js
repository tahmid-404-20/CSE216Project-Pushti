const express = require("express");
const router = express.Router();
const registerController = require("../controller/registerController");
const getLoanOptions = require("../controller/getLoanOptions");
const getLocationInfo = require("../controller/getLocationInfo");

router.use("/", registerController);
router.use("/loanOptions", getLoanOptions);
router.use("/locInfo", getLocationInfo);

module.exports = router;
