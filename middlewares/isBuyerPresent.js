const express = require("express");
const router = express.Router();
const oracleDB = require("oracledb");

router.use(express.json());

function checkPresence(req, res, next) {
  if (req.session.user) {
    const { firstname, lastname, nid, dob, phoneNo } = req.body;

    console.log(req.body);

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
            const p = `select nid from Buyer where nid = ${nid}`;
            console.log(p);
            con.execute(p, [], (e, r) => {
              if (e) {
                res.send(e);
              } else {
                if (r.rows.length === 1) {
                  req.flash(
                    "error",
                    "Already registered with the provided NID"
                  );
                  res.redirect(301, "/");
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
  } else {
    res.end("Unauthorized user");
  }
}

router.use(checkPresence);
module.exports = router;
