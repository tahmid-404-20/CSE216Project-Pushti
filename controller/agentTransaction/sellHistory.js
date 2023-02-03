const express = require("express");

const router = express.Router();
const oracleDB = require("oracledb");

router.use(express.json());

router.route("/").get((req, res, next) => {
  if (req.session.user) {
    var title = process.env.APPNAME.toString() + " - " + "Sell History";

    res.render("showSellHistory", {
      title: title,
    });
  } else {
    res.end("Unauthorized Access");
  }
});

router.route("/getSellHistory").post((req, res, next) => {
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
            const p = `SELECT B.NID, B.NAME, P.NAME PRODUCT,S.QUANTITY,S.RECEIVED_AMOUNT,S.DATE_TIME
                        FROM 
                        (SELECT BUYER_ID, PRODUCT_ID,QUANTITY,DATE_TIME,RECEIVED_AMOUNT
                        FROM SELLLOG 
                        WHERE AGENT_ID = ${agent_id}
                        ) S, (SELECT NID, NAME FROM BUYER WHERE AGENT_ID = ${agent_id}) B, PRODUCTS P
                        WHERE S.PRODUCT_ID = P.PRODUCT_ID AND B.NID = S.BUYER_ID
                        ORDER BY S.DATE_TIME DESC`;
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
