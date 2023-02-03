const express = require("express");

const router = express.Router();
const oracleDB = require("oracledb");

router.use(express.json());

function sendFarmerType(req, res) {
  if (req.session.user) {
    var agent_id = req.session.user;

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
            const p = `select nid,type_id,name,address,profile_photo,(select title from farmertype t where t.TYPE_ID = f.TYPE_ID) from Farmer f where nid = ${farmerNID}`;
            con.execute(p, [], (e, r) => {
              if (e) {
                res.send(e);
              } else {
                if (r.rows.length === 1) {
                  const type_id = r.rows[0][1];
                  const q = `SELECT PRODUCT_ID, NAME FROM PRODUCTS NATURAL JOIN (SELECT PRODUCT_ID FROM PRODUCES WHERE TYPE_ID = ${type_id}) T`;
                  con.execute(q, [], (eQ, rQ) => {
                    if (eQ) {
                      res.send(eQ);
                    } else {
                      res.send({
                        row: rQ.rows,
                        name: r.rows[0][2],
                        address: r.rows[0][3],
                        dp: r.rows[0][4],
                        type: r.rows[0][5]
                      });
                    }
                  });
                } else {
                  res.send({
                    error: "Not a Valid Farmer NID",
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

router.use(sendFarmerType);
module.exports = router;
