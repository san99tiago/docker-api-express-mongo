let express = require("express");
let router = express.Router();
let {signup, signin} = require("../controllers/auth.controller.js");

// register and login functionalities
router.post("/users/register", signup, function (req, res) {});

router.post("/users/login", signin, function (req, res) {});

module.exports = router;
