const express = require("express");
const cookieParser = require("cookie-parser");
const url = require("url");

const router = express.Router();
const oracleDB = require("oracledb");

router.use(cookieParser());
router.use(express.json());

router.route("/").get((req, res, next) => {
  if (req.session.user) {
    var id = req.session.user;
    var id_int = parseInt(id);

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
            const p = `select * from Farmer where nid = ${id}`;
            const q = `select Agent.name FROM FARMER, Agent WHERE FARMER.nid = ${id_int} AND Agent.id = FARMER.agent_id`;
            const type = `select ft.title from farmerType ft, farmer f where f.nid = ${id_int} and ft.type_id = f.type_id`;
            // when insert  { autoCommit: true } between [], and (e,r) for inserting values
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
                    con.execute(type, [], (rer, rR) => {
                      if (rer) {
                        console.log("Error in second statement");
                        res.send(rer);
                      } else {
                        console.log("In gather farmer Info, r and rQ");
                        console.log(r.rows);
                        console.log(rQ.rows);
                        var title =
                          process.env.APPNAME.toString() +
                          " - " +
                          "Farmer Dashboard";
                        res.render("farmerDashboard", {
                          title: title,
                          nid: r.rows[0][0],
                          name: r.rows[0][1],
                          due: r.rows[0][3],
                          dob: r.rows[0][4],
                          phoneNo: r.rows[0][5],
                          address: r.rows[0][6],
                          agentId: r.rows[0][7],
                          agentName: rQ.rows[0][0],
                          typeName: rR.rows[0][0],
                          profile_picture: r.rows[0][11],
                        });
                      }
                    });
                  }
                });
                //     console.log(r);
                //   console.log(r.rows);
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
