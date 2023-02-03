const express = require("express");
const router = express.Router();
const oracleDB = require("oracledb");

router.use(express.json());

function validateFarmer(req, res, next) {
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
            const p = `select nid from Farmer where nid = ${farmerNID}`;
            con.execute(p, [], (e, r) => {
              if (e) {
                res.send(e);
              } else {
                if (r.rows.length === 1) {
                  next();
                } else {
                  const notFound = `Not a valid farmer ID`;
                  res.send({
                    error: notFound,
                  });
                }
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
}

router.use(validateFarmer);
module.exports = router;
