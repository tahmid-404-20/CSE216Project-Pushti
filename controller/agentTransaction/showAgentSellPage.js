const express = require("express");

const router = express.Router();
const oracleDB = require("oracledb");

router.use(express.json());

router.route("/").get((req, res, next) => {
  if (req.session.user) {
    var title = process.env.APPNAME.toString() + " - " + "Sell Products";
    res.render("agentSellPage", {
      title: title,
    });
  } else {
    res.end("Unauthorized user");
  }
});

module.exports = router;
