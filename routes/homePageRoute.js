const express = require("express");
const router = express.Router();
const flash = require("connect-flash");

router.use(flash());

router.get("/", (req, res) => {
  res.render("HomeView", { message: req.flash("message") });
});

module.exports = router;
