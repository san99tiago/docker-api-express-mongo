let express = require("express");
let router = express.Router();

// home endpoint (auth required)
router.get(["/", "/home"], (req, res) => {
    res.status(200).json(
      {
        message: "Welcome to the default endpoint for the climate raw data API!",
        paths_auth: ["/users/register [POST]", "/users/login [POST]"],
        paths_data_students_and_teachers: ["[GET] /data/readings"],
        paths_data_teachers_only: ["[POST] /data/readings"],
        usage_1: "First, make sure that you register with your email at {'/users/register' [POST]} with 'x-www-form-urlencoded' parameters of 'fullName', 'email', and 'password'. This will create your user on the system.",
        usage_2: "After registering, go to {'/users/login' [POST]} with 'x-www-form-urlencoded' parameters of 'email' and 'password', and obtain the JWT token.",
        usage_3: "If you are a <student> or a <teacher>, you can access {'/data/*' [GET]} with 'headers' of 'Authorization' and the value of the obtained JWT token (like this: 'JWT TOKEN_VALUE', remember to keep the JWT word and then a space in the middle)",
        usage_4: "If you are a <teacher>, you can access {'/data/*' [POST]} with 'headers' of 'Authorization' and the value of the obtained JWT token (like this: 'JWT TOKEN_VALUE', remember to keep the JWT word and then a space in the middle)",
        usage_5: "If you try to access the <student> or <teacher> endpoints without the JWT token (corresponding to the 'Authorization' header value), you won't be able to access the endpoint (you can try).",
      }
    );
  });

module.exports = router;
