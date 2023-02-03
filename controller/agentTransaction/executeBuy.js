const express = require("express");
const router = express.Router();
const oracleDB = require("oracledb");

router.use(express.json());

router.route("/").post((req, res, next) => {
  if (req.session.user) {
    const agent_id = req.session.user;
    const { farmerNID, productId, quantity } = req.body;

    console.log(req.body);

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
            const p = `select count(*) from buylog`;
            con.execute(p, [], (e, r) => {
              if (e) {
                console.log("error in rquest quesry");
                console.log(e);
              } else {
                const prevStatus = {};
                const currentStatus = {};
                const rs = `SELECT A.ID, U.BUDGET FROM (SELECT ID, UNION_ID FROM AGENT) A, (SELECT ID, BUDGET FROM UNIONPARISHAD) U
                      WHERE A.UNION_ID = U.ID AND A.ID = ${agent_id}`;
                con.execute(rs, [], (er, rr) => {
                  if (er) {
                    console.log("Error in budget");
                  } else {
                    const m = `SELECT DUE FROM FARMER WHERE NID = ${farmerNID}`;
                    // console.log(q);
                    con.execute(m, [], (em, rm) => {
                      if (em) {
                        console.log("Error in getting due");
                      } else {
                        const budget = rr.rows[0][1];
                        const due = rm.rows[0][0];

                        prevStatus["budget"] = budget;
                        prevStatus["due"] = due;

                        // Insertion in BuyLog
                        var bid = r.rows[0][0];
                        bid = (BigInt(bid) + BigInt(1)).toString();
                        const q = `INSERT INTO BuyLog(bid,agent_id,farmer_id,product_id,quantity,date_time) VALUES(${bid},${agent_id},${farmerNID},${productId}, ${quantity}, SYSDATE)`;
                        console.log(q);
                        con.execute(q, [], { autoCommit: true }, (eQ, rQ) => {
                          if (eQ) {
                            console.log("error in buyLog insertion");
                            res.send({
                              error: eQ,
                            });
                          } else {
                            // will maintain file later
                            // second update
                            const a = `SELECT A.ID, U.BUDGET FROM (SELECT ID, UNION_ID FROM AGENT) A, (SELECT ID, BUDGET FROM UNIONPARISHAD) U
                            WHERE A.UNION_ID = U.ID AND A.ID = ${agent_id}`;
                            con.execute(a, [], (ea, ra) => {
                              if (ea) {
                                console.log("Error in budget");
                              } else {
                                const b = `SELECT DUE FROM FARMER WHERE NID = ${farmerNID}`;
                                con.execute(b, [], (eb, rb) => {
                                  if (eb) {
                                    console.log("Error in getting due");
                                  } else {
                                    const budget = ra.rows[0][1];
                                    const due = rb.rows[0][0];

                                    currentStatus["budget"] = budget;
                                    currentStatus["due"] = due;

                                    // sending here
                                    console.log("Prev Stat:");
                                    console.log(prevStatus);
                                    console.log("Curr Stat:");
                                    console.log(currentStatus);

                                    var amountToPay =
                                      parseFloat(prevStatus.budget) -
                                      parseFloat(currentStatus.budget);

                                    var dueDeduction =
                                      parseFloat(prevStatus.due) -
                                      parseFloat(currentStatus.due);

                                    const unitPriceProduct = `SELECT UNIT_PRICE FROM PRODUCTS WHERE PRODUCT_ID = ${productId}`;

                                    con.execute(
                                      unitPriceProduct,
                                      [],
                                      (e_up, r_up) => {
                                        if (e_up) {
                                          console.log("Error in up product");
                                        } else {
                                          var unit_price = parseFloat(
                                            r_up.rows[0][0]
                                          );

                                          var tax =
                                            unit_price * parseFloat(quantity) -
                                            amountToPay -
                                            dueDeduction;

                                          const updateBuyLog = `UPDATE BUYLOG SET PAID_AMOUNT = ${amountToPay}, DUE_DEDUCTION = ${dueDeduction}, TAX_AMOUNT = ${tax} WHERE BID = ${bid}`;
                                          con.execute(
                                            updateBuyLog,
                                            [],
                                            { autoCommit: true },
                                            (eblU, rblU) => {
                                              if (eblU) {
                                                console.log(
                                                  "Error in final update"
                                                );
                                              } else {
                                                console.log(
                                                  "Insertion Successful"
                                                );
                                                res.send({
                                                  status: "success",
                                                  amount: amountToPay,
                                                });
                                              }
                                            }
                                          );
                                        }
                                      }
                                    );
                                  }
                                });
                              }
                            });
                          }
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
});

async function getBudgetandDue(agent_id, farmerNID, statusObject) {
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
          console.log("Error in db connection getBudge");
        } else {
          const a = `SELECT A.ID, U.BUDGET FROM (SELECT ID, UNION_ID FROM AGENT) A, (SELECT ID, BUDGET FROM UNIONPARISHAD) U
                      WHERE A.UNION_ID = U.ID AND A.ID = ${agent_id}`;
          con.execute(a, [], (ea, ra) => {
            if (ea) {
              console.log("Error in budget");
            } else {
              const b = `SELECT DUE FROM FARMER WHERE NID = ${farmerNID}`;
              con.execute(b, [], (eb, rb) => {
                if (eb) {
                  console.log("Error in getting due");
                } else {
                  const budget = ra.rows[0][1];
                  const due = rb.rows[0][0];

                  statusObject["budget"] = budget;
                  statusObject["due"] = due;
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
}

module.exports = router;
