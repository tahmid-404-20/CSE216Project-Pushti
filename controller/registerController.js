const express = require("express");
const router = express.Router();
const path = require("path");
var cors = require("cors");
var bodyParser = require("body-parser");
var multer = require("multer");
var upload = multer();
const oracleDB = require("oracledb");

const {addUserValidators,
  addUserValidationHandler} = require('../middlewares/registerInputValidator');

const registerValidator = require("./registerValidator");
const requestInserter = require("./requestInserter");
const registerPendingRequest = require("./registerIsPendingRequest");

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

// use this router for validating the input of the user
router.post("/process-request", [addUserValidators, addUserValidationHandler, registerPendingRequest, requestInserter] );

router.get("/", (req, res) => {
  var title = process.env.APPNAME.toString() + " - " + "Farmer Registration";
  res.render("register", {
    title: title,
  });
});

module.exports = router;
