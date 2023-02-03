const express = require("express");

const router = express.Router();
const oracleDB = require("oracledb");

router.use(express.json());

router.route("/").get((req, res, next) => {
  if (req.session.user) {
    var title = process.env.APPNAME.toString() + " - " + "Transaction History";

    res.render("showFarmerTransactions", {
      title: title,
    });
  } else {
    res.end("Unauthorized Access");
  }
});

router.route("/getTransactions").post((req, res, next) => {
  if (req.session.user) {
    const farmer_id = req.session.user;

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
            const p = `SELECT P.NAME,B.QUANTITY,B.DATE_TIME,B.PAID_AMOUNT,B.DUE_DEDUCTION,B.TAX_AMOUNT
                        FROM 
                        (SELECT FARMER_ID, PRODUCT_ID,QUANTITY,DATE_TIME,PAID_AMOUNT,DUE_DEDUCTION,TAX_AMOUNT
                        FROM BUYLOG 
                        WHERE FARMER_ID = ${farmer_id}
                        ) B, PRODUCTS P
                        WHERE B.PRODUCT_ID = P.PRODUCT_ID
                        ORDER BY B.DATE_TIME DESC`;
            con.execute(p, [], (e, r) => {
              if (e) {
                res.send({
                  error: e,
                });
              } else {
                res.send(r.rows);
              }
            });
          }
        }
      );
    } catch (e) {
      console.log(e);
    }
  } else {
    res.end("Unauthorized Access");
  }
});

module.exports = router;
