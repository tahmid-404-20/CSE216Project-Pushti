const express = require("express");
const url = require("url");

const router = express.Router();
const oracleDB = require("oracledb");

router.use(express.json());

router.route("/").get((req, res, next) => {
  if (req.session.user) {
    var title = process.env.APPNAME.toString() + " - " + "Farmer Info";
    res.render("adminFarmerInfo", {
      title: title,
    });
  } else {
    res.end("Unauthorized User");
  }
});

router.post("/get-id-interactive", (req, res, next) => {
  if (req.session.user) {
    const { farmerNID, union_id } = req.body;
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
            const p = `SELECT ID FROM AGENT WHERE id = GET_UNION_AGENTID(${union_id})`;
            con.execute(p, [], (e, r) => {
              if (e) {
                res.send({
                  error: e,
                });
              } else {
                const q = `SELECT NID
                    FROM FARMER 
                    WHERE AGENT_ID = ${r.rows[0][0]} AND
                    TO_CHAR(NID) LIKE '${farmerNID}%'`;

                con.execute(q, [], (eQ, rQ) => {
                  if (eQ) {
                    res.send({
                      error: eQ,
                    });
                  } else {
                    res.send(rQ.rows);
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

router.post("/get-info", (req, res, next) => {
  if (req.session.user) {
    const { farmerNID } = req.body;

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
            const p = `SELECT nid, name, title, dob, phoneno, address, agent_id, profile_photo
            FROM farmer f, farmertype t 
            WHERE f.nid = ${farmerNID}
            AND f.type_id = t.type_id`;
            const q = `select Agent.name FROM FARMER, Agent WHERE FARMER.nid = ${farmerNID} AND Agent.id = FARMER.agent_id`;
            con.execute(p, [], (e, r) => {
              if (e) {
                console.log("Error in first statement");
                res.send(e);
              } else {
                con.execute(q, [], (er, rQ) => {
                  if (er) {
                    console.log("Error in second statement");
                    res.send(er);
                  } else {
                    console.log("In gather farmer Info, r and rQ");
                    console.log(r.rows);
                    console.log(rQ.rows);
                    if(r.rows.length == 0){
                      const fail = {
                        status: "fail"
                      };
                      res.send(fail);
                    }
                    else{
                    const farmerResponse = {
                      nid: r.rows[0][0],
                      name: r.rows[0][1],
                      type: r.rows[0][2],
                      dob: r.rows[0][3],
                      phoneNo: r.rows[0][4],
                      address: r.rows[0][5],
                      agentId: r.rows[0][6],
                      dp: r.rows[0][7],
                      agentName: rQ.rows[0][0],
                    };
                    res.send(farmerResponse);
                  }
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
