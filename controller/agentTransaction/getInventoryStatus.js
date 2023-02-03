const express = require("express");

const router = express.Router();
const oracleDB = require("oracledb");

router.use(express.json());

router.route("/").get((req, res, next) => {
  if (req.session.user) {
    var title = process.env.APPNAME.toString() + " - " + "Inventory Status";

    res.render("inventoryStatus", {
      title: title,
    });
  } else {
    res.end("Unauthorized Access");
  }
});

router.route("/getCurrentInventoryStatus").post((req, res, next) => {
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
            const p = `SELECT P.NAME, P.UNIT_PRICE, I.QUANTITY FROM (SELECT ID, UNION_ID FROM AGENT) A , INVENTORY I, PRODUCTS P
                        WHERE A.UNION_ID = I.UNION_ID AND I.PRODUCT_ID = P.PRODUCT_ID AND A.ID = ${agent_id}`;
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
