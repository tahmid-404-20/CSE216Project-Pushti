const express = require("express");
const url = require("url");

const router = express.Router();
const oracleDB = require("oracledb");

router.use(express.json());

router.route("/").get((req, res, next) => {
  if (req.session.user) {
    var title =
      process.env.APPNAME.toString() + " - " + "Agent - Send Feedback";
    res.render("sendFeedbackAgent", {
      title: title,
    });
  } else {
    res.end("Unauthorized Access");
  }
});

router.route("/insert-feedback").post((req, res, next) => {
  if (req.session.user) {
    const agent_id = req.session.user;

    const { details } = req.body;

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
            const p = `SELECT count(*) from AgentFeedback`;
            con.execute(p, [], (e, r) => {
              if (e) {
                res.send({
                  error: e,
                });
              } else {
                var feedback_id = r.rows[0][0];
                feedback_id = (BigInt(feedback_id) + BigInt(1)).toString();

                const q = `INSERT INTO AgentFeedback VALUES(${feedback_id},'${details}',SYSDATE,'F',${agent_id})`;

                con.execute(q, [], { autoCommit: true }, (eQ, rQ) => {
                  if (eQ) {
                    res.send({
                      error: eQ,
                    });
                  } else {
                    res.send({
                      status: "success",
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

module.exports = router;
