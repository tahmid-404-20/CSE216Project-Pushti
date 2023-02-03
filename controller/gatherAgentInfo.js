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
            const p =
              "select id,name,phoneNo,permanentAddress, profile_photo FROM agent WHERE id = " +
              id_int;
            const q =
              "select UnionParishad.name, UnionParishad.budget from UnionParishad, (SELECT union_id FROM Agent where id = " +
              id_int +
              ") T where T.union_id = UnionParishad.id";

            const count =
              "select count(nid) from farmer where agent_id = " + id_int;
            // when insert  { autoCommit: true } between [], and (e,r) for inserting values
            con.execute(p, [], (e, r) => {
              if (e) {
                res.send(e);
              } else {
                con.execute(q, [], (er, rQ) => {
                  if (er) {
                    res.send(er);
                  } else {
                    con.execute(count, [], (rer, rR) => {
                      if (rer) {
                        res.send(rer);
                      } else {
                        console.log("In gather agent Info, r and rQ");
                        console.log(r.rows);
                        console.log(rQ.rows);
                        console.log(rR.rows);
                        var title =
                          process.env.APPNAME.toString() +
                          " - " +
                          "Agent Dashboard";
                        res.render("agentDashboard", {
                          title: title,
                          id: r.rows[0][0],
                          name: r.rows[0][1],
                          phoneNo: r.rows[0][2],
                          permanentAddress: r.rows[0][3],
                          upname: rQ.rows[0][0],
                          budget: rQ.rows[0][1],
                          farmers: rR.rows[0][0],
                          profile_picture: r.rows[0][4],
                        });
                      }
                    });
                  }
                });
                console.log(r);
                console.log(r.rows);
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
