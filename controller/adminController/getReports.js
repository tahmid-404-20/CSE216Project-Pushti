const express = require("express");
const router = express.Router();
const getReportsPost = require("./getReportsPost");

router.use("/getReport", [requestEnhancer, getReportsPost]);
router.get("/", (req, res) => {
  var title = process.env.APPNAME.toString() + " - " + "Combined Reports";

  res.render("adminCombinedReports", {
    title: title,
  });
});

function requestEnhancer(req, res, next) {
  req.clearTimeout(); // clear request timeout
  req.setTimeout(20000); //set a 20s timeout for this request
  next();
}
module.exports = router;
