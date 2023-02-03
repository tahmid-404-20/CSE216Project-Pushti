const express = require('express');
const router = express.Router();

const oracleDB = require("oracledb");
router.use(express.json());

router.get("/", (req, res) => {
  if (req.session.user) {
    var title = process.env.APPNAME.toString() + " - " + "Update Tax";

    res.render("adminUpdateTax", {
      title: title,
    });
  } else {
    res.end("Unauthorized User");
  }
});

router.route("/getloans").post((req, res, next) => {
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
                        console.log("Connection established in request updater");
                        console.log(req.body);
                        const p = `SELECT LOAN.LOAN_ID, AMOUNT, DEDUCTION, TAX, (SELECT FARMERTYPE.TITLE FROM FARMERTYPE WHERE FARMERTYPE.TYPE_ID = RECEIVES.TYPE_ID)
                                    FROM LOAN, RECEIVES
                                    WHERE LOAN.LOAN_ID = RECEIVES.LOAN_ID
                                    ORDER BY AMOUNT`;
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
});

router.route("/update").post((req, res, next) => {
    if (req.session.user) {
        const { loan_id, tax } = req.body;
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
                        console.log("Connection established in request updater");
                        console.log(req.body);
                        const p = `UPDATE LOAN
                                    SET TAX = ${tax}
                                    WHERE LOAN_ID = ${loan_id}`;
                        con.execute(p, [], {autoCommit:true}, (e, r) => {
                            if (e) {
                                res.send({
                                    error: e,
                                });
                            } else {
                                res.send({
                                    success: "Sucess"
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

module.exports = router;