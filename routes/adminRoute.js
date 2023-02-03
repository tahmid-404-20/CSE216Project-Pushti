const express = require("express");
const oracleDB = require("oracledb");
const router = express.Router();
const getFarmerFeedback = require("../controller/adminController/getFarmerFeedback");
const getAgentFeedback = require("../controller/adminController/getAgentFeedback");
const getReports = require("../controller/adminController/getReports");
const addProduct = require("../controller/adminController/addProduct");
const updatePrice = require("../controller/adminController/updatePrice");
const upReport = require("../controller/adminController/upReportPage");
const updateBudget = require("../controller/adminController/updateBudget");
const getFarmerInfo = require("../controller/adminController/getFarmerInfo");
const updateAgent = require('../controller/adminController/updateAgent');
const updateTax = require('../controller/adminController/updateTax');
const addLoan = require('../controller/adminController/addLoan');

router.use("/agentfeedbacks", getAgentFeedback);
router.use("/farmerfeedbacks", getFarmerFeedback);
router.use("/combined-reports", getReports);
router.use("/addproduct", addProduct);
router.use("/updateprice", updatePrice);
router.use("/UpReport", upReport);
router.use("/updatebudget", updateBudget);
router.use("/getfarmerinfo", getFarmerInfo);
router.use("/updateagent", updateAgent);
router.use("/updatetax", updateTax);
router.use("/addloan", addLoan);

router.get("/", (req, res) => {
  if (req.session.user) {
    try {
      var username = process.env.SCHEMANAME;
      var pass = process.env.password;
      var conn_tns = process.env.tns;
      oracleDB.getConnection(
        {
          user: username,
          password: pass,
          tns: conn_tns,
        },
        (err, con) => {
          if (err) {
            res.send("db connnection error", err);
          } else {
            const p = `SELECT COUNT(*), SUM(getLoan(loan_id)), getTax FROM farmer`;
            con.execute(p, [], (er, out) => {
              if (er) {
                console.log(er);
              } else {
                var title =
                  process.env.APPNAME.toString() + " - " + "Admin Dashboard";
                res.render("adminDashboard", {
                  title: title,
                  farmerNumber: out.rows[0][0],
                  loan: out.rows[0][1],
                  tax: out.rows[0][2],
                });
              }
            });
          }
        }
      );
    } catch (e) {
      console.log(e);
    }
  } else {
    res.end("Unauthorized Login");
  }
});

module.exports = router;
