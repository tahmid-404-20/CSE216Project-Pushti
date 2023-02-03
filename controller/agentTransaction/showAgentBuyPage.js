const express = require("express");

const router = express.Router();
const oracleDB = require("oracledb");

router.use(express.json());

router.route("/").get((req, res, next) => {
  if (req.session.user) {
    var id = req.session.user;

    var title = process.env.APPNAME.toString() + " - " + "Buy Products";
    res.render("agentBuyPage", {
      title: title,
    });
  } else {
    res.end("Unauthorized user");
  }
});

module.exports = router;
