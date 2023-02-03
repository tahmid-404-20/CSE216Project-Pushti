const express = require("express");
const cookieParser = require("cookie-parser");
const url = require("url");
const flash = require("connect-flash");

const router = express.Router();
const oracleDB = require("oracledb");

router.use(flash());
router.use(cookieParser());
router.use(express.json());

String.prototype.initCap = function () {
   return this.toLowerCase().replace(/(?:^|\s)[a-z]/g, function (m) {
      return m.toUpperCase();
   });
};


// router.route("/").post((req, res, next) => {
//   console.log(req.body);

//   const {
//     firstname,
//     lastname,
//     nid,
//     dob,
//     password,
//     address,
//     phoneNo,
//     up,
//     farmerType,
//     loanType,
//   } = req.body;
//   const fullName = firstname + " " + lastname;
//   // fullName = fullName.initCap();

//   try {
//     var username = process.env.SCHEMANAME;
//     var pass = process.env.password;
//     var conn_tns = process.env.tns;
//     oracleDB.getConnection(
//       {
//         user: username,
//         password: pass,
//         tns: conn_tns,
//       },
//       (err, con) => {
//         if (err) {
//           res.send("db connnection error", err);
//         } else {
//           console.log("Connection established in register now");

//           const m = `SELECT id from Agent WHERE union_id = ${up}`;

//           con.execute(m, [], (em, rm) => {
//             if (em) {
//               res.send(em);
//             } else {
//               const p = `select count(*) from request`;
//               con.execute(p, [], (e, r) => {
//                 if (e) {
//                   console.log("error in rquest quesry");
//                   console.log(e);
//                   res.send(e);
//                 } else {
//                   var req_id = r.rows[0][0];
//                   req_id = (BigInt(req_id) + BigInt(1)).toString();

//                   console.log("ReqID: " + req_id);
//                   const agentId = rm.rows[0][0];
//                   const q = `insert into request values(${req_id} , ${nid}, INITCAP('${fullName}'), '${password}', TO_DATE('${dob}', 'YYYY-MM-DD'),'${phoneNo}','${address}', ${agentId}, ${farmerType}, ${loanType}, 'P')`;

//                   con.execute(q, [], { autoCommit: true }, (eQ, rQ) => {
//                     if (eQ) {
//                       console.log("error in request insertion");
//                       console.log(eQ);
//                       res.send({
//                         error_db:"Insertion Error"
//                       });
//                     } else {
//                       res.send({
//                         success:"Insertion successful",
//                       })
//                     }
//                   });
//                 }
//               });
//             }
//           });
//         }
//       }
//     );
//   } catch (e) {
//     console.log(e);
//   }
// });

function insertRequest(req,res,next) {
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
  const fullName = firstname + " " + lastname;

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

          const m = `SELECT id from Agent WHERE union_id = ${up}`;

          con.execute(m, [], (em, rm) => {
            if (em) {
              res.send(em);
            } else {
              const p = `select count(*) from request`;
              con.execute(p, [], (e, r) => {
                if (e) {
                  console.log("error in rquest quesry");
                  console.log(e);
                  res.send(e);
                } else {
                  var req_id = r.rows[0][0];
                  req_id = (BigInt(req_id) + BigInt(1)).toString();

                  console.log("ReqID: " + req_id);
                  const agentId = rm.rows[0][0];
                  const q = `insert into request values(${req_id} , ${nid},'${fullName}', '${password}', TO_DATE('${dob}', 'YYYY-MM-DD'),'${phoneNo}','${address}', ${agentId}, ${farmerType}, ${loanType}, 'P')`;

                  con.execute(q, [], { autoCommit: true }, (eQ, rQ) => {
                    if (eQ) {
                      console.log("error in request insertion");
                      console.log(eQ);
                      res.send(eQ);
                    } else {
                      res.send({
                        success:"Insertion successful",
                      })
                    }
                  });
                }
              });
            }
          });
        }
      }
    );
  } catch (e) {
    console.log(e);
  }
}

router.use(insertRequest);
module.exports = router;
