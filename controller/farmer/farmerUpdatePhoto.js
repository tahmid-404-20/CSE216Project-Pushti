const express = require("express");
// create router
const router = express.Router();
const oracleDB = require("oracledb");

// use multer to upload png, jpg, jpeg files
const multer = require("multer");
const path = require("path");

const UPLOADS_FOLDER = "./public/profile_pictures/farmer/";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOADS_FOLDER); // will create if doesn't exist
  },
  filename: (req, file, cb) => {
    const farmer_id = req.session.user;
    const fileExt = path.extname(file.originalname);
    const file_name = `${farmer_id}-${Date.now()}${fileExt}`;
    cb(null, file_name);
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10485760, // 10 mb max limit
  },
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype === "image/png" ||
      file.mimetype === "image/jpg" ||
      file.mimetype === "image/jpeg"
    ) {
      cb(null, true); // everything correct, allowes file upload
    } else {
      cb(new Error("Only .jpg, .png or .jpeg format allowed!")); // blocks file upload
    }
  },
});

router.post("/", upload.single("avatar"), (req, res) => {
  const farmer_id = req.session.user;
  const file_name = req.file.filename;
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
          const p = `UPDATE FARMER
                    SET PROFILE_PHOTO = '${file_name}'
                    WHERE NID = ${farmer_id}`;
          con.execute(p, [], { autoCommit: true }, (e, r) => {
            if (e) {
              console.log(e);
              res.send({
                db_error: e.message,
              });
            } else {
              res.redirect(301, "/farmer/");
            }
          });
        }
      }
    );
  } catch (e) {
    console.log(e);
  }
});

// default error handler, executes when file related error occurs
router.use((err, req, res, next) => {
  if (err) {
    if (err instanceof multer.MulterError) {
      res.send({
        error_message_multer: "There was a problem uploading file",
      });
    } else {
      res.send({
        error_message_other: err.message,
      });
    }
  }
});

module.exports = router;
