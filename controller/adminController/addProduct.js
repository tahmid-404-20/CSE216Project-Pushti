const express = require("express");
const router = express.Router();

const oracleDB = require("oracledb");
router.use(express.json());

router.get("/", (req, res) => {
  var title = process.env.APPNAME.toString() + " - " + "Add A Product";

  res.render("adminAddProduct", {
    title: title,
  });
});

router.post("/add-a-product", (req, res) => {
  const { product_name, un_price, farmer_type } = req.body;

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
          const p = `BEGIN
          ADD_PRODUCT('${product_name}', ${un_price}, ${farmer_type});
          END;
        `;
          con.execute(p, [], { autoCommit: true }, (e, r) => {
            if (e) {
              console.log(e);
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
});

module.exports = router;
