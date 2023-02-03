const express = require("express");

const router = express.Router();
const oracleDB = require("oracledb");

router.use(express.json());

const {addUserValidators,
  addUserValidationHandler} = require('../../middlewares/farmerChangePasswordValidator');

router.route("/").get((req, res, next) => {
  if (req.session.user) {
    var title = process.env.APPNAME.toString() + " - " + "Update Information";

    res.render("farmerUpdateInfo", {
      title: title,
    });
  } else {
    res.end("Unauthorized Access");
  }
});

router.post("/update", [addUserValidators, addUserValidationHandler, updatePass])

function updatePass(req,res,next) {
if (req.session.user) {
    const farmer_id = req.session.user;

    const {oldpassword, newpassword} = req.body;

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
            const p = `SELECT PASSWORD
                      FROM FARMER
                      WHERE NID = ${farmer_id}`;
            con.execute(p, [], (e, r) => {
              if (e) {
                res.send({
                  error: e,
                });
              } else {
                var old_pass = r.rows[0][0];

                if (old_pass.toString().trim() === oldpassword) {
                  const q = `UPDATE FARMER
                            SET PASSWORD = '${newpassword}'
                            WHERE NID = ${farmer_id}`;
                  con.execute(q, [], {autoCommit:true}, (e, r) => {
                    if (e) {
                      res.send({
                        error: e,
                      });
                    } else {
                      res.send({
                        success: "Password updated successfully",
                      });
                    }
                  });
                } else {
                  res.send({
                    error: "Old Password is incorrect",
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
    res.end("Unauthorized Access");
  }
}

// router.route("/getTransactions").post((req, res, next) => {
//   if (req.session.user) {
//     const farmer_id = req.session.user;

//     const {oldpassword, newpassword} = req.body;

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
//             const p = `SELECT PASSWORD
//                       FROM FARMER
//                       WHERE NID = ${farmer_id}`;
//             con.execute(p, [], (e, r) => {
//               if (e) {
//                 res.send({
//                   error: e,
//                 });
//               } else {
//                 var old_pass = r.rows[0][0];

//                 if (old_pass == oldpassword) {
//                   const q = `UPDATE FARMER
//                             SET PASSWORD = '${newpassword}'
//                             WHERE NID = ${farmer_id}`;
//                   con.execute(q, [], {autoCommit:true}, (e, r) => {
//                     if (e) {
//                       res.send({
//                         error: e,
//                       });
//                     } else {
//                       res.send({
//                         success: "Password updated successfully",
//                       });
//                     }
//                   });
//                 } else {
//                   res.send({
//                     error: "Old Password is incorrect",
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
//     res.end("Unauthorized Access");
//   }
// });

module.exports = router;
