const express = require("express");
const router = express.Router();

const showAgentSellPage = require("./showAgentSellPage");
const executeSell = require("./executeSell");
const isBuyerValid = require("../../middlewares/isBuyerValid");
const getBuyer = require("./getBuyerInteractiveSell");

router.get("/", showAgentSellPage);

router.post("/validateBuyer", isBuyerValid);
router.post("/executesell", executeSell);
router.post("/getBuyer", getBuyer);

module.exports = router;
