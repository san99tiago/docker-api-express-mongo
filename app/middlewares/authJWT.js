const jwt = require("jsonwebtoken");
let User = require("../models/user");

const verifyToken = (req, res, next) => {
  console.log("--------------------------------------------------------------");
  console.log("--> Starting JWT verification process...")
  console.log("--------------------------------------------------------------");
  req.expired = undefined;
  if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT') {
    jwt.verify(req.headers.authorization.split(' ')[1], process.env.API_SECRET, function (err, decode) {
      if (err) {
        console.log('err: ', err.message);
        if (err.message.includes('jwt expired')) {
          req.expired = true;
        }
        next();
      } else {
        console.log('decode:', decode);
        User.findOne({
          _id: decode.id
        })
        .exec((err, user) => {
          if (err) {
            res.status(500)
              .send({
                message: err
              });
          } else {
            console.log('user found: ', user);
            req.user = user;
            next();
          }
        })
      }
    });
  } else {
    req.user = undefined;
    next();
  }
};

module.exports = verifyToken;
