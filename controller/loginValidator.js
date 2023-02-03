const express = require("express");
const cookieParser = require("cookie-parser");
const url = require("url");
const flash = require("connect-flash");

const router = express.Router();
const oracleDB = require("oracledb");

router.use(flash());
router.use(cookieParser());
router.use(express.json());

// router.route("/").get((req, res, next) => {
//   // console.log(req.body);
//   try {
//     oracleDB.getConnection(
//       {
//         user: "c##trial",
//         password: "trial",
//         tns: "localhost:1522/ORCL",
//       },
//       (err, con) => {
//         if (err) {
//           res.send("db connnection error", err);
//         } else {
//           console.log("Connection established");
//           const p = "select * from division";
//           // when insert  { autoCommit: true } between [], and (e,r) for inserting values
//           con.execute(p, [], (e, r) => {
//             if (e) {
//               res.send(e);
//             } else {
//               console.log(r);
//               console.log(r.rows);
//               res.send(r);
//             }
//           });
//         }
//       }
//     );
//   } catch (e) {
//     console.log(e);
//   }
// });

router.route("/").post((req, res, next) => {
  console.log(req.body);
  const { id, password } = req.body;
  var id_int = parseInt(id);

  if (id_int.toString().length === 7) {
    if (id_int === 2441139 && password === "2441139") {
      req.session.user = "admin";
      res.redirect("../admin");
    } else {
      req.flash("error", "Invalid username or password");
      res.redirect(301, "/login");
    }
  } else {
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
            res.send("db connnection error");
          } else {
            console.log("Connection established in oracle!??");
            console.log("ID lenght: " + id_int.toString().length);
            if (id_int.toString().length === 8) {
              const p =
                "select id,name, union_id from agent where id = " +
                id_int +
                "and password = " +
                password;

              //   when insert  { autoCommit: true } between [], and (e,r) for inserting values
              con.execute(p, [], (e, r) => {
                if (e) {
                  console.log(e);
                  res.send(e);
                } else {
                  console.log("Print response");
                  console.log(r);
                  console.log(r.rows);
                  // console.log(r.rows[0][0]);
                  if (r.rows.length === 1) {
                    req.session.user = id;
                    res.redirect("../agent");
                  } else {
                    req.flash("error", "Invalid username or password");
                    res.redirect(301, "/login");
                  }
                }
              });
            } else if (id_int.toString().length === 10) {
              const p =
                "select nid from farmer where nid = " +
                id +
                "and password = " +
                password;

              //   when insert  { autoCommit: true } between [], and (e,r) for inserting values
              con.execute(p, [], (e, r) => {
                if (e) {
                  console.log(e);
                  res.send(e);
                } else {
                  console.log("Print response Farmer");
                  console.log(r);
                  console.log(r.rows);
                  if (r.rows.length === 1) {
                    req.session.user = id;
                    res.redirect("../farmer");
                  } else {
                    req.flash("error", "Invalid username or password");
                    res.redirect(301, "/login");
                  }
                }
              });
            } else {
              req.flash("error", "Invalid username or password");
              res.redirect(301, "/login");
            }

            // Multiple statements
            //   const p = `insert into division values(${id},'${name}')`;
            //   const q = `insert into district values(65,'Shattik_bro', ${id})`;
            //   con.execute(p, [], { autoCommit: true }, (e, r) => {
            //     if (e) {
            //       res.send(e);
            //     } else {
            //       con.execute(q, [], { autoCommit: true }, (er, rQ) => {
            //         if (er) {
            //           res.send(er);
            //         } else {
            //           res.send(rQ);
            //         }
            //       });
            //     }
            //   });
          }
        }
      );
    } catch (e) {
      console.log("Connection ERROR??");
      console.log(e);
    }
  }
});

module.exports = router;
