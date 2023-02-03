const express = require("express");
const url = require("url");

const router = express.Router();
const oracleDB = require("oracledb");

router.use(express.json());

router.route("/").get((req, res, next) => {
  if (req.session.user) {
    var title = process.env.APPNAME.toString() + " - " + "Agent Requests";

    res.render("request", {
      title: title,
    });
  } else {
    res.send("Unauthorized User");
  }
});

router.route("/").post((req, res, next) => {
  if (req.session.user) {
    var id = req.session.user;

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

            const p = `select * from request where agent_id = ${id} AND approve='P'`;
            var responseArray = [];
            con.execute(p, [], (e, r) => {
              if (e) {
                res.send(e);
              } else {
                for (var i = 0; i < r.rows.length; i++) {
                  console.log("In here");
                  var req_id = r.rows[i][0];
                  var nid = r.rows[i][1];
                  var name = r.rows[i][2];
                  var phoneNo = r.rows[i][5];
                  var address = r.rows[i][6];
                  var type_id = r.rows[i][8];
                  var loan_id = r.rows[i][9];

                  var data = {
                    req_id,
                    nid,
                    name,
                    phoneNo,
                    address,
                    type_id,
                    loan_id,
                  };

                  responseArray.push(data);
                }

                console.log(responseArray);
                var myJsonString = JSON.stringify(responseArray);
                res.send(myJsonString);
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

router.route("/loan-amount/").post((req, res, next) => {
  if (req.session.user) {
    const { loan_id, row } = req.body;

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

            const p = `select amount from loan where loan_id = ${loan_id}`;
            con.execute(p, [], (e, r) => {
              if (e) {
                res.send(e);
              } else {
                const amount = r.rows[0][0];
                res.send({
                  amount: amount,
                  row: row,
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

router.route("/farmer-type/").post((req, res, next) => {
  if (req.session.user) {
    const { type_id, row } = req.body;

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

            const p = `select title from farmerType where type_id = ${type_id}`;
            con.execute(p, [], (e, r) => {
              if (e) {
                res.send(e);
              } else {
                const farmerType = r.rows[0][0];
                res.send({
                  farmerType: farmerType,
                  row: row,
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

router.route("/update-request/").post((req, res, next) => {
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
