const express = require("express");
const router = express.Router();

const oracleDB = require("oracledb");
router.use(express.json());


function ifReqPending(req,res,next) {
const {
    firstname,
    lastname,
    nid,
    dob,
    password,
    address,
    phoneNo,
    up,
    farmerType,
    loanType,
  } = req.body;

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
          console.log("Connection established in register now");

          const p = `SELECT REQUEST_ID
                    FROM REQUEST
                    WHERE FARMER_NID = ${nid}
                    AND APPROVE = 'P'`;

            con.execute(p, [], (e, r) => {
                if(e) {
                    console.log("DB error");
                    res.send({
                        error_db:e
                    });
                } else {
                    if(r.rows.length > 0) {
                        res.send({
                            pending:"You already have a pending request"
                        });
                    } else {
                        next();
                    }
                }
            });

        }
      }
    );
  } catch (e) {
    console.log(e);
  }
}

router.use(ifReqPending);
module.exports = router;
