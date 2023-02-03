const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  if (req.session.user) {
    req.session.destroy(function (err) {
      if (err) {
        res.send("Unknown Error Occurred");
      } else {
        res.redirect(301, "../login");
      }
    });
  } else {
    res.end("Unauthorized access");
  }
});

module.exports = router;
