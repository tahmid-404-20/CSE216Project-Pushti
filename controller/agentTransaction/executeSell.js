const express = require("express");
const router = express.Router();
const oracleDB = require("oracledb");

router.use(express.json());

router.use(executeBuyProcess);

function executeBuyProcess(req, res) {
  if (req.session.user) {
    const agent_id = req.session.user;
    const { buyerNID, productId, quantity } = req.body;

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
            const p = `select count(*) from selllog`;
            con.execute(p, [], (e, r) => {
              if (e) {
                console.log("error in rquest quesry");
                console.log(e);
                res.send(e);
              } else {
                // gather product info
                const unitPriceProduct = `SELECT UNIT_PRICE FROM PRODUCTS WHERE PRODUCT_ID = ${productId}`;
                con.execute(unitPriceProduct, [], (e_up, r_up) => {
                  if (e_up) {
                    console.log("Error getting unit price");
                    console.log(e_up);
                  } else {
                    var unit_price = r_up.rows[0][0];
                    var received_amount =
                      parseFloat(unit_price) * parseFloat(quantity);

                    var sid = r.rows[0][0];
                    sid = (BigInt(sid) + BigInt(1)).toString();
                    const q = `INSERT INTO SellLog VALUES(${sid},${agent_id},${buyerNID},${productId}, ${quantity}, SYSDATE, ${received_amount})`;
                    con.execute(q, [], { autoCommit: true }, (eQ, rQ) => {
                      if (eQ) {
                        console.log("error in sellLog insertion");
                        res.send({
                          error: eQ,
                        });
                      } else {
                        // will maintain file later
                        console.log(
                          `Received amount in sell: ${received_amount}`
                        );
                        res.send({
                          status: "success",
                          amount: received_amount,
                        });
                      }
                    });
                  }
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
    res.end("Unauthorized user");
  }
}

module.exports = router;
