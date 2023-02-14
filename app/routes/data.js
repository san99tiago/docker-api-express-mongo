let express = require("express");
let router = express.Router();
let verifyToken = require('../middlewares/authJWT');

// "student" or "teacher" endpoint (auth required)
router.get("/data/readings", verifyToken, function (req, res) {
  if (req.expired) {
    res.status(403)
    .send({
      message: "JWT expired, please log in again"
    });
    return
  }

  if (req.user == undefined) {
    res.status(403)
    .send({
      message: "Invalid JWT token"
    });
    return
  }

  if (req.user.role == "administrator" || req.user.role == "teacher" || req.user.role == "student") {
    res.status(200)
      .send({
        message: "Congratulations, you entered the '/data/reading/' [GET] endpoint"
      });
  } else {
    res.status(403)
      .send({
        message: "Unauthorized access"
      });
  }
});

// "teacher" only endpoint (auth required)
router.post("/data/readings", verifyToken, function (req, res) {
  if (req.expired) {
    res.status(403)
    .send({
      message: "JWT expired, please log in again"
    });
    return
  }

  if (req.user == undefined) {
    res.status(403)
    .send({
      message: "Invalid JWT token."
    });
    return
  }

  if (req.user.role == "administrator" || req.user.role == "teacher") {
    res.status(200)
      .send({
        message: "Congratulations, you entered the '/data/reading/' [POST] endpoint"
      });
  } else {
    res.status(403)
      .send({
        message: "Unauthorized access"
      });
  }
});

module.exports = router;
