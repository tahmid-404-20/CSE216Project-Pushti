const express = require("express");

const router = express.Router();
const oracleDB = require("oracledb");

router.use(express.json());

router.route("/").post((req, res, next) => {
  const { locType, id } = req.body;

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
            p = `select * from division`;
          } else if (locType === "district") {
            p = `select id, name from district where division_id = ${id}`;
          } else if (locType === "upazilla") {
            p = `select id, name from upazilla where district_id = ${id}`;
          } else if (locType === "up") {
            p = `select id, name from UnionParishad where upazilla_id = ${id}`;
          }
          //   const p = `SELECT loan.loan_id, amount, deduction, tax FROM loan,receives WHERE loan.loan_id = receives.loan_id AND type_id = ${type_id}`;
          con.execute(p, [], (e, r) => {
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
});

module.exports = router;
