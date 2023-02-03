const express = require("express");
const cookieParser = require("cookie-parser");
const url = require("url");

const router = express.Router();
const oracleDB = require("oracledb");

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

  const {
    firstname,
    lastname,
    nid,
    dob,
    password,
    address,
    phoneNo,
    agentId,
    farmerType,
    loantype,
  } = req.body;
  const fullName = firstname + " " + lastname;
  const nid_i = parseInt(nid);

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
          const q = `insert into farmer values(${nid},'${fullName}', '${password}', TO_DATE('${dob}', 'YYYY-MM-DD'),'${phoneNo}','${address}', ${agentId})`;
          //   when insert  { autoCommit: true } between [], and (e,r) for inserting values
          con.execute(q, [], { autoCommit: true }, (e, r) => {
            if (e) {
              console.log("error in farmer insertion");
              console.log(e);
              res.send(e);
            } else {
              console.log(r);
              res.redirect(301, "../farmer?nid=" + nid);
              // res.render('adminDashboard', {
              //     id:r.rows[0][0]
              // })

              // res.send(r)
            }
          });

          // Multiple statements
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
    console.log(e);
  }
});

module.exports = router;
