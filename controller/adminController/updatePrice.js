const express = require("express");
const router = express.Router();

const oracleDB = require("oracledb");
router.use(express.json());

router.get("/", (req, res) => {
  var title = process.env.APPNAME.toString() + " - " + "Update Price";

  res.render("adminUpdatePrice", {
    title: title,
  });
});

// gives you the list of products
router.post("/product-list", (req, res) => {
  if (req.session.user) {
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
            const p = `SELECT PRODUCT_ID, NAME FROM PRODUCTS`;
            con.execute(p, [], (e, r) => {
              if (e) {
                console.log(e);
                res.send(e);
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
    res.end("Unauthorized Access");
  }
});

// gives you the details of a particular product
router.post("/product-details", (req, res) => {
  if (req.session.user) {
    const { product_id } = req.body;
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
            const p = `SELECT PRODUCT_ID, NAME, UNIT_PRICE
                        FROM PRODUCTS
                        WHERE PRODUCT_ID = ${product_id}`;
            con.execute(p, [], (e, r) => {
              if (e) {
                console.log(e);
                res.send(e);
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
    res.end("Unauthorized Access");
  }
});

// update the price of a product
router.post("/update-price", (req, res) => {
  if (req.session.user) {
    const { product_id, unit_price } = req.body;
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
            const p = `UPDATE PRODUCTS
                    SET UNIT_PRICE = ${unit_price}
                    WHERE PRODUCT_ID = ${product_id}`;
            con.execute(p, [], { autoCommit: true }, (e, r) => {
              if (e) {
                res.send(e);
              } else {
                res.send({
                  success: "Successful",
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
    res.end("Unauthorized Access");
  }
});

module.exports = router;
