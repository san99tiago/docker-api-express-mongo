let express = require("express");
let router = express.Router();
let {signup, signin} = require("../controllers/auth.controller.js");
let User = require("../models/user");


// Register and Login functionalities
router.post("/users/register", signup, function (req, res) {});
router.post("/users/login", signin, function (req, res) {});

// Management functionalities for users
router.get("/users/query", function (req, res) {
  console.log("--------------------------------------------------------------");
  console.log("--> Starting [GET] /users/query process...")
  console.log("--------------------------------------------------------------");

  console.log(req.query)

  User.find({
    "role": req.query.role,
  })
  .select({
    "fullName": 1,
    "email": 1,
    "role": 1
  })
  .exec(function (err, results) {
    if (err) {
      console.log(err);
    } else {
      console.log(results);
      res.status(200)
        .send(results);
    }
  });
});

router.put("/users/advanced/make-admins", function (req, res) {
  console.log("--------------------------------------------------------------");
  console.log("--> Starting [PUT] /users/make-admins process...")
  console.log("--------------------------------------------------------------");

  console.log(req.body)

  User.updateMany(
    { "email": req.body },
    { "role": "admin" }, function (err, results) {
    if (err) {
      console.log(err);
    } else {
      console.log(results);
      res.status(200)
      .send(results);
    }
  });
});

router.delete("/users/:id", function (req, res) {
  console.log("--------------------------------------------------------------");
  console.log("--> Starting [DELETE] /users/query process...")
  console.log("--------------------------------------------------------------");

  console.log(req.params.id)

  User.findByIdAndDelete(String(req.params.id), function (err, results) {
    if (err) {
      console.log(err);
    } else {
      console.log(results);
      res.status(202)
        .send(results);
    }
  });
});

router.delete("/users/advanced/all-students", function (req, res) {
  console.log("--------------------------------------------------------------");
  console.log("--> Starting [DELETE] /users/advanced/all-students process...")
  console.log("--------------------------------------------------------------");

  User.deleteMany({ "role": "student" }, function (err, results) {
    if (err) {
      console.log(err);
    } else {
      console.log(results);
      res.status(202)
        .send(results);
    }
  });
});

module.exports = router;
