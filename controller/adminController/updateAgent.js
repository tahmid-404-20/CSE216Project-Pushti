const express = require('express');
const oracleDB = require("oracledb");
const router = express.Router();
router.use(express.json());

router.route("/").get((req, res, next) => {
  if (req.session.user) {
    var title = process.env.APPNAME.toString() + " - " + "Update Agent";
    res.render("adminUpdateAgent", {
      title: title,
    });
  } else {
    res.end("Unauthorized User");
  }
});
 
router.route("/getdetails").post((req, res, next) => {
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
            console.log("Connection established in request updater");
            console.log(req.body);
            const p = `SELECT ID, NAME, DOB, PHONENO, PERMANENTADDRESS, PROFILE_PHOTO
                        FROM AGENT
                        WHERE ID = GET_UNION_AGENTID(${union_id})`;
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
    const { agent_id, name, dob, phoneno, permanentaddress, profile_photo } = req.body;
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
            const p = `UPDATE AGENT
                        SET NAME = '${name}', DOB = TO_DATE('${dob}', 'YYYY-MM-DD'), PHONENO = '${phoneno}', PERMANENTADDRESS = '${permanentaddress}', PROFILE_PHOTO = '${profile_photo}'
                        WHERE ID = ${agent_id}`;
            con.execute(p, [], {autoCommit:true}, (e, r) => {
              if (e) {
                res.send({
                  error: e,
                });
              } else {
                res.send({
                  success:"Successful"
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