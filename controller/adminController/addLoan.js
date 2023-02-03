const express = require('express');
const router = express.Router();

const oracleDB = require("oracledb");
router.use(express.json());

router.get("/", (req, res) => {
  if (req.session.user) {
    var title = process.env.APPNAME.toString() + " - " + "Add Loan";

    res.render("adminAddLoan", {
      title: title,
    });
  } else {
    res.send("Unauthorized User");
  }
});

// add a loan to the database
router.route("/add").post((req, res, next) => {
    if (req.session.user) {
        const { amount, deduction, tax, farmerType } = req.body;
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
                        console.log("Connection established");
                        const p = `BEGIN
                        ADD_LOAN(${amount}, ${deduction}, ${tax}, ${farmerType});
                        END;
                        `;
                        con.execute(p, [], { autoCommit: true }, (e, r) => {
                            if (e) {
                            console.log(e);
                            res.send(e);
                            } else {
                            res.send({
                                success: "Successful",
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
);

module.exports = router;