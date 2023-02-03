const express = require("express");
const router = express.Router();
const oracleDB = require("oracledb");

router.use(express.json());

function validateBuyer(req, res, next) {
  if (req.session.user) {
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
            console.log("Connection established");
            const p = `select nid, name, phoneno from Buyer where nid = ${buyerNID}`;
            con.execute(p, [], (e, r) => {
              if (e) {
                res.send(e);
              } else {
                if (r.rows.length === 1) {
                  const q = `SELECT product_id, name from products`;
                  con.execute(q, [], (eQ, rQ) => {
                    if (eQ) {
                      res.send(eQ);
                    } else {
                      res.send({
                        row: rQ.rows, 
                        name: r.rows[0][1],
                        phone: r.rows[0][2]
                      });
                    }
                  });
                } else {
                  const notFound = `Not a valid buyer NID`;
                  res.send({
                    error: notFound,
                  });
                }
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

router.use(validateBuyer);
module.exports = router;
