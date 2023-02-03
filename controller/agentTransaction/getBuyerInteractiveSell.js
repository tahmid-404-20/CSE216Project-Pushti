const express = require("express");

const router = express.Router();
const oracleDB = require("oracledb");

router.use(express.json());

function sendBuyer(req, res) {
  if (req.session.user) {
    const agent_id = req.session.user;

    const { buyerNID } = req.body;

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
            const p = `SELECT NID
                    FROM BUYER 
                    WHERE AGENT_ID = ${agent_id} AND
                    TO_CHAR(NID) LIKE '${buyerNID}%'`;
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
    res.end("Unauthorized user");
  }
}

router.use(sendBuyer);
module.exports = router;
