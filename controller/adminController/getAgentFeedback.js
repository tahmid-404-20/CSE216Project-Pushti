const express = require("express");
const url = require("url");

const router = express.Router();
const oracleDB = require("oracledb");

router.use(express.json());

router.route("/").get((req, res, next) => {
  if (req.session.user) {
    var title = process.env.APPNAME.toString() + " - " + "Agent Feedbacks";
    res.render("showAgentFeedback", {
      title: title,
    });
  } else {
    res.send("Unauthorized User");
  }
});

router.route("/getfeedbacks").post((req, res, next) => {
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
            const p = `SELECT f.feedback_id, a.id, a.name, GET_LOCATION(a.union_id), f.date_time, f.read
            FROM agentfeedback f, agent a 
            WHERE a.id = f.agent_id
            ORDER BY f.date_time DESC`;
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

router.route("/getdetails").post((req, res, next) => {
  if (req.session.user) {
    const { feedback_id } = req.body;
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
            const p = `SELECT details FROM agentfeedback WHERE feedback_id = ${feedback_id}`;
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

router.route("/markreadfeedback").post((req, res, next) => {
  if (req.session.user) {
    const { feedback_id } = req.body;
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
            const p = `UPDATE AgentFeedback SET read = 'T' WHERE feedback_id = ${feedback_id}`;
            con.execute(p, [], { autoCommit: true }, (e, r) => {
              if (e) {
                res.send({
                  error: e,
                });
              } else {
                res.send({
                  status: "success",
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
