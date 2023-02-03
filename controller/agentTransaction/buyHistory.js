const express = require("express");

const router = express.Router();
const oracleDB = require("oracledb");

router.use(express.json());

router.route("/").get((req, res, next) => {
  if (req.session.user) {
    var title = process.env.APPNAME.toString() + " - " + "Buy History";

    res.render("showBuyHistory", {
      title: title,
    });
  } else {
    res.end("Unauthorized Access");
  }
});

router.route("/getBuyHistory").post((req, res, next) => {
  if (req.session.user) {
    const agent_id = req.session.user;

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
            const p = `SELECT F.NID, F.NAME, P.NAME PRODUCT,B.QUANTITY,B.PAID_AMOUNT,B.DATE_TIME
                        FROM 
                        (SELECT FARMER_ID, PRODUCT_ID,QUANTITY,DATE_TIME,PAID_AMOUNT
                        FROM BUYLOG 
                        WHERE AGENT_ID = ${agent_id}
                        ) B, (SELECT NID, NAME FROM FARMER WHERE AGENT_ID = ${agent_id}) F, PRODUCTS P
                        WHERE B.PRODUCT_ID = P.PRODUCT_ID AND F.NID = B.FARMER_ID
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
