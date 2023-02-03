const express = require("express");
const router = express.Router();
const agentController = require("../controller/agentController");
const agentBuyController = require("../controller/agentTransaction/agentBuyController");
const requestController = require("../controller/agentTransaction/requestController");
const agentSellController = require("../controller/agentTransaction/agentSellController");
const buyerRegisterController = require("../controller/buyerRegisterController");
const sendfeedbackAgent = require("../controller/agentTransaction/sendFeedbackAgent");
const buyHistory = require("../controller/agentTransaction/buyHistory");
const sellHistory = require("../controller/agentTransaction/sellHistory");
const getInventoryStatus = require("../controller/agentTransaction/getInventoryStatus");
const agentUpdatePhoto = require("../controller/agentTransaction/agentUpdatePhoto");

router.use(express.json());

router.use("/", agentController);
router.use("/update-photo", agentUpdatePhoto);
router.use("/requests", requestController);
router.use("/sellproducts", agentSellController);
router.use("/buyproducts", agentBuyController);
router.use("/register-buyer", buyerRegisterController);
router.use("/inventorystatus", getInventoryStatus);
router.use("/buyhistory", buyHistory);
router.use("/sellhistory", sellHistory);
router.use("/sendfeedback", sendfeedbackAgent);

module.exports = router;
