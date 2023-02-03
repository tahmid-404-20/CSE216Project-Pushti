const express = require("express");
const router = express.Router();
const oracleDB = require("oracledb");

router.use(express.json());

// router.route("/").post((req, res, next) => {
//   if (req.session.user) {
//     const agent_id = req.session.user;
//     const { firstname, lastname, nid, dob, phoneNo } = req.body;

//     const name = firstname + " " + lastname;

//     console.log(req.body);

//     try {
//       var username = process.env.SCHEMANAME;
//       var pass = process.env.password;
//       var conn_tns = process.env.tns;
//       oracleDB.getConnection(
//         {
//           user: username,
//           password: pass,
//           tns: conn_tns,
//         },
//         (err, con) => {
//           if (err) {
//             res.send("db connnection error", err);
//           } else {
//             const p = `select nid from Buyer where nid = ${nid}`;
//             con.execute(p, [], (e, r) => {
//               if (e) {
//                 res.send(e);
//               } else {
//                 if (r.rows.length === 1) {
//                   // req.flash("error", "Buyer Already Registered with this NID");
//                   // res.redirect(301, "/");
//                   res.send({
//                     error: "Buyer Already Registered with this NID",
//                   });
//                 } else {
//                   const q = `INSERT INTO Buyer VALUES(${nid},'${name}', TO_DATE('${dob}', 'YYYY-MM-DD'),'${phoneNo}',${agent_id})`;
//                   console.log("q =>" + q);
//                   con.execute(q, [], { autoCommit: true }, (eQ, rQ) => {
//                     if (eQ) {
//                       res.send(eQ);
//                     } else {
//                       // req.flash("success", "Buyer Registered Successfully");
//                       // res.redirect(301, "/");
//                       res.send({
//                         message: "Buyer Registered Successfully",
//                       });
//                     }
//                   });
//                 }
//               }
//             });
//           }
//         }
//       );
//     } catch (e) {
//       console.log(e);
//     }
//   } else {
//     res.end("Unauthorized user");
//   }
// });

function insertBuyer(req,res,next) {
  if (req.session.user) {
    const agent_id = req.session.user;
    const { firstname, lastname, nid, dob, phoneNo } = req.body;

    const name = firstname + " " + lastname;

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
            const p = `select nid from Buyer where nid = ${nid}`;
            con.execute(p, [], (e, r) => {
              if (e) {
                res.send(e);
              } else {
                if (r.rows.length === 1) {
                  // req.flash("error", "Buyer Already Registered with this NID");
                  // res.redirect(301, "/");
                  res.send({
                    error: "Buyer Already Registered with this NID",
                  });
                } else {
                  const q = `INSERT INTO Buyer VALUES(${nid},'${name}', TO_DATE('${dob}', 'YYYY-MM-DD'),'${phoneNo}',${agent_id})`;
                  console.log("q =>" + q);
                  con.execute(q, [], { autoCommit: true }, (eQ, rQ) => {
                    if (eQ) {
                      res.send(eQ);
                    } else {
                      // req.flash("success", "Buyer Registered Successfully");
                      // res.redirect(301, "/");
                      res.send({
                        message: "Buyer Registered Successfully",
                      });
                    }
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

router.use(insertBuyer);

module.exports = router;
