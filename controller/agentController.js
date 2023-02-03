const express = require("express");
const router = express.Router();
const url = require("url");
const gatherAgentInfos = require("./gatherAgentInfo");

router.get("/", gatherAgentInfos);

// router.get('/', (req,res) => {
//     var queryData = url.parse(req.url, true).query;
//     id = queryData.id;
//     res.render('agentDashboard', {
//         id:id
//     })
// })

module.exports = router;
