const express = require("express");
const router = express.Router();

const oracleDB = require("oracledb");
router.use(express.json());

router.get("/", (req, res) => {
  var title = process.env.APPNAME.toString() + " - " + "Update Budget";

  res.render("adminUpdateBudget", {
    title: title,
  });
});

// give details of a union parishad
router.post("/union-details", (req, res) => {
  if (req.session.user) {
    const { union_id } = req.body;
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
            const p = `SELECT ID, NAME, BUDGET
                        FROM UNIONPARISHAD
                        WHERE ID = ${union_id}`;
            con.execute(p, [], (e, r) => {
              if (e) {
                console.log(e);
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

// update the budget of a union parishad
router.post("/update-budget", (req, res) => {
  if (req.session.user) {
    const { union_id, budget } = req.body;
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
            const p = `UPDATE UNIONPARISHAD
                        SET BUDGET = ${budget}
                        WHERE ID = ${union_id}`;
            con.execute(p, [], { autoCommit: true }, (e, r) => {
              if (e) {
                console.log(e);
                res.send(e);
              } else {
                res.send({ success: "Successful" });
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
