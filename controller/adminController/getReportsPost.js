const express = require("express");

const router = express.Router();
const oracleDB = require("oracledb");

router.use(express.json());

router.route("/").post((req, res, next) => {
  if (req.session.user) {
    const { locType, id } = req.body;
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
            if (locType === "division") {
              p = `SELECT ID, NAME, NO_OF_DISTRICTS_DIVISION(ID), NO_OF_UPAZILLAS_DIVISION(ID), NO_OF_UNIONS_DIVISION(ID), NVL(NO_OF_FARMERS_DIVISION(ID),0), NVL(TOTAL_GIVEN_LOAN_DIVISION(ID),0),NVL(TOTAL_DUE_DEDUCTION_DIVISION(ID),0), NVL(TOTAL_TAX_DIVISION(ID),0)
                FROM DIVISION`;
            } else if (locType === "district") {
              p = `SELECT ID, NAME, (SELECT DIVISION.NAME FROM DIVISION WHERE DIVISION.ID = DISTRICT.DIVISION_ID), NO_OF_UPAZILLAS_DISTRICT(ID), NO_OF_UNIONS_DISTRICT(ID), NVL(NO_OF_FARMERS_DISTRICT(ID),0), NVL(TOTAL_GIVEN_LOAN_DISTRICT(ID),0),NVL(TOTAL_DUE_DEDUCTION_DISTRICT(ID),0), NVL(TOTAL_TAX_DISTRICT(ID),0)
                    FROM DISTRICT`;
            } else if (locType === "upazilla") {
              p = `SELECT ID, NAME, NO_OF_UNIONS_UPAZILLA(ID), NVL(NO_OF_FARMERS_UPAZILLA(ID),0), NVL(TOTAL_GIVEN_LOAN_UPAZILLA(ID),0),NVL(TOTAL_DUE_DEDUCTION_UPAZILLA(ID),0), NVL(TOTAL_TAX_UPAZILLA(ID),0)
                FROM UPAZILLA
                WHERE DISTRICT_ID = ${id}`;
            } else if (locType === "up") {
              p = `SELECT ID, NAME, BUDGET, NO_OF_FARMERS_UNION(ID), NVL(TOTAL_GIVEN_LOAN_UNION(ID),0), NVL(TOTAL_DUE_DEDUCTION_UNION(ID),0), NVL(TOTAL_TAX_UNION(ID),0)
                FROM UNIONPARISHAD
                WHERE UPAZILLA_ID = ${id}`;
            }

            //   const p = `SELECT loan.loan_id, amount, deduction, tax FROM loan,receives WHERE loan.loan_id = receives.loan_id AND type_id = ${type_id}`;
            con.execute(p, (e, r) => {
              if (e) {
                console.log("Error ahsraf says");
                console.log(e);
                res.send(e);
              } else {
                console.log(r.rows);
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
