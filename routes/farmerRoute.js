const express = require("express");
const router = express.Router();
const farmerController = require("../controller/farmerController");
const sendFeedbackFarmer = require("../controller/farmer/sendFeedbackFarmer");
const showFarmerTransactions = require("../controller/farmer/showFarmerTransactions");
const updateProfilePhoto = require("../controller/farmer/farmerUpdatePhoto");
const updateInfo = require("../controller/farmer/farmerUpdateInfo");

router.use("/", farmerController);
router.use("/sendfeedback", sendFeedbackFarmer);
router.use("/transactions", showFarmerTransactions);
router.use("/update-photo", updateProfilePhoto);
router.use("/updateinfo", updateInfo);

module.exports = router;
