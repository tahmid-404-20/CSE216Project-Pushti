const express = require("express");
const router = express.Router();
const showAgentBuyPage = require("./showAgentBuyPage");
const getFarmerTypeProducts = require("./getFarmerTypeProducts");
const executeBuy = require("./executeBuy");
const isFarmerValid = require("../../middlewares/isFarmerValid");
const getFarmerInteractive = require("./getFarmerInteractiveBuy");

router.get("/", showAgentBuyPage);

// At first getfarmerType executed, then executeBuy

router.post("/getproducts", getFarmerTypeProducts);
router.post("/getfarmers", getFarmerInteractive);

router.use("/executebuy", executeBuy);

module.exports = router;
