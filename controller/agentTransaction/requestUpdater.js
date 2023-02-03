const express = require("express");
const url = require("url");

const router = express.Router();
const oracleDB = require("oracledb");

router.use(express.json());

router.route("/").post((req, res, next) => {
  if (req.session.user) {
    var id = req.session.user;

    const { req_id, status } = req.body;

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
            const p = `UPDATE REQUEST SET approve = '${status}' WHERE request_id = ${req_id}`;
            con.execute(p, [], { autoCommit: true }, (e, r) => {
              if (e) {
                console.log(e);
                res.send({
                  error: e,
                });
              } else {
                res.send({
                  status: "successful",
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
