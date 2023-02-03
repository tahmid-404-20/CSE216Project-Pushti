const express = require("express");
const router = express.Router();
const getUpReports = require("./upReport");

router.use("/getUpReport", getUpReports);
router.get("/", (req, res) => {
  var title = process.env.APPNAME.toString() + " - " + "UP Reports";

  res.render("adminUpReport", {
    title: title,
  });
});

module.exports = router;
