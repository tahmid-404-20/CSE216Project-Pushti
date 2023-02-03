const express = require("express");
const router = express.Router();
const url = require("url");
const gatherFarmerInfos = require("./gatherFarmerInfo");
const getFarmerInfo = require("./getFarmerInfo");

router.get("/", gatherFarmerInfos);
router.post("/", (req, res) => {
  res.send(req.body);
});

// router.post("/", getFarmerInfo);

// router.get('/', (req,res) => {
//     var queryData = url.parse(req.url, true).query;
//     id = queryData.id;
//     res.render('agentDashboard', {
//         id:id
//     })
// })

module.exports = router;
