const express = require("express");
const router = express.Router();
const path = require("path");
var cors = require("cors");
var bodyParser = require("body-parser");
var multer = require("multer");
var upload = multer();
const flash = require("connect-flash");

const loginValidator = require("../controller/loginValidator");

router.use(flash());
router.use(cors());
// for parsing application/json
router.use(bodyParser.json());
// for parsing application/xwww-
router.use(bodyParser.urlencoded({ extended: true }));
//form-urlencoded
// for parsing multipart/form-data
router.use(upload.array());
router.use(express.json());
router.use(express.static(path.join(__dirname, "public")));

router.get("/", (req, res) => {
  var title = process.env.APPNAME.toString() + " - " + "Login";
  res.render("login", {
    title: title,
    error: req.flash("error"),
    logout: req.flash("logout"),
  });
  // res.send("Hello world")
});

router.post("/", loginValidator);

module.exports = router;
