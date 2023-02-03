const express = require("express");

const router = express.Router();
const oracleDB = require("oracledb");

router.use(express.json());

router.route("/").post((req, res) => {
  if (req.session.user) {
    const { id } = req.body;
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
            console.log("Connection established");

            let p;
            p = `SELECT U.name, NO_OF_FARMERS_UNION(U.id), budget, NVL(TOTAL_GIVEN_LOAN_UNION(U.id),0), NVL(TOTAL_DUE_DEDUCTION_UNION(U.id),0), NVL(TOTAL_TAX_UNION(U.id),0), A.id, A.name, A.phoneno, A.PERMANENTADDRESS, TRUNC(MONTHS_BETWEEN(SYSDATE, A.dob)/12)
            FROM UNIONPARISHAD U, Agent A
            WHERE U.id = ${id}
            AND U.id = A.union_id`;

            //   const p = `SELECT loan.loan_id, amount, deduction, tax FROM loan,receives WHERE loan.loan_id = receives.loan_id AND type_id = ${type_id}`;
            con.execute(p, (e, r) => {
              if (e) {
                res.send(e);
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
