const express = require("express");
const cookieParser = require("cookie-parser");
const url = require("url");

const router = express.Router();
const oracleDB = require("oracledb");

router.use(cookieParser());
router.use(express.json());

router.route("/").post((req, res, next) => {
  id = req.body;
  id_int = parseInt(id);

  try {
    oracleDB.getConnection(
      {
        user: "c##trial",
        password: "trial",
        tns: "localhost:1522/ORCL",
      },
      (err, con) => {
        if (err) {
          res.send("db connnection error", err);
        } else {
          console.log("Connection established");
          const p = `select * from Farmer where nid = ${id}`;
          const q = `select Agent.name FROM FARMER, Agent WHERE FARMER.nid = ${id_int} AND Agent.id = FARMER.agent_id`;
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
                  console.log("In gather farmer Info, r and rQ");
                  console.log(r.rows);
                  console.log(rQ.rows);

                  const farmerResponse = {
                    nid: r.rows[0][0],
                    name: r.rows[0][1],
                    dob: r.rows[0][3],
                    phoneNo: r.rows[0][4],
                    address: r.rows[0][5],
                    agentId: r.rows[0][6],
                    agentName: rQ.rows[0][0],
                  };

                  res.send(farmerResponse);
                  //   res.render("farmerDashboard", {
                  //     nid: r.rows[0][0],
                  //     name: r.rows[0][1],
                  //     dob: r.rows[0][3],
                  //     phoneNo: r.rows[0][4],
                  //     address: r.rows[0][5],
                  //     agentId: r.rows[0][6],
                  //     agentName: rQ.rows[0][0],
                  //   });
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
});

module.exports = router;
