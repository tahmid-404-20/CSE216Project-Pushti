const express = require("express");
const router = express.Router();
const buyerInserter = require("./buyerInserter");
const isBuyerPresent = require("../middlewares/isBuyerPresent");

const {addUserValidators,
  addUserValidationHandler} = require('../middlewares/buyerRegisterInputValidator');
const { route } = require("./buyerInserter");

router.use(express.json());

// router.use("/process-register", buyerInserter);

router.post("/process-register", [addUserValidators, addUserValidationHandler, buyerInserter]);

router.get("/", (req, res) => {
  if (req.session.user) {
    var title = process.env.APPNAME.toString() + " - " + "Register Buyer";

    res.render("registerBuyer", {
      title: title,
    });
  } else {
    res.send("Unauthorized User");
  }
});

module.exports = router;
