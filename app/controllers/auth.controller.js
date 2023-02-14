const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
let User = require("../models/user");

exports.signup = (req, res) => {
  console.log("--------------------------------------------------------------");
  console.log("--> Starting user register process...")
  console.log("--------------------------------------------------------------");

  if (
    req.body.hasOwnProperty("fullName") &&
    req.body.hasOwnProperty("email") &&
    req.body.hasOwnProperty("password")) {
    const user = new User({
      fullName: req.body.fullName,
      email: req.body.email,
      role: "student",
      password: bcrypt.hashSync(req.body.password, 8)
    });

    user.save((err, user) => {
      if (err) {
        res.status(500)
        .send({
          message: err
        });
        return;
      } else {
        res.status(200)
        .send({
          message: "User Registered successfully"
        })
      }
    });
  } else {
    res.status(403)
    .send({
      message: "You must pass properties 'fullName', 'email', 'role' and 'password' in the body as 'x-www-form-urlencoded'"
    })
  }
};

exports.signin = (req, res) => {
  console.log("--------------------------------------------------------------");
  console.log("--> Starting login process...")
  console.log("--------------------------------------------------------------");

  User.findOne({
      email: req.body.email
    })
    .exec((err, user) => {
      if (err) {
        res.status(500)
          .send({
            message: err
          });
        return;
      }
      if (!user) {
        return res.status(404)
          .send({
            message: "User Not found."
          });
      }

      // Compare passwords of body and real one
      let passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );
      // Checking if password was valid and send response if wrong password
      if (!passwordIsValid) {
        return res.status(401)
          .send({
            accessToken: null,
            message: "Invalid Password!"
          });
      }
      // Signing token with user id
      var token = jwt.sign({
        id: user.id
      }, process.env.API_SECRET, {
        expiresIn: Number(process.env.JWT_SIGNATURE_EXPIRE_TIME)
      });

      // We update "lastLogin" field for the TTL index (the ones that deletes users after X amount of time)
      var currentDateForLastLogin = Date.now();
      User.updateOne({email: req.body.email},
        {lastLogin: currentDateForLastLogin}, function (err, docs) {
          if (err){
              console.log(err)
          }
          else{
              console.log(`Updated user with email ${req.body.email} lastLogin set to ${currentDateForLastLogin}`);
          }
        }
      );

      // Respond client request with user profile success message and JWT access token
      res.status(200)
        .send({
          user: {
            id: user._id,
            email: user.email,
            fullName: user.fullName,
          },
          message: "Login was successful. Use 'Authorization' header with the given 'accessToken'",
          accessToken: `JWT ${token}`,
        });
    });
};
