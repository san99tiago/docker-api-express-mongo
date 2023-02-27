let express = require("express");
let router = express.Router();
let verifyToken = require('../middlewares/authJWT');
let Data = require("../models/data");

// "student" or "teacher" endpoint (auth required)
router.get("/data/readings/:id", verifyToken, function (req, res) {

  console.log("--------------------------------------------------------------");
  console.log("--> Starting [GET] /data/readings process...")
  console.log("--------------------------------------------------------------");

  const id = req.params.id;
  console.log(id);

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
    Data.findById(String(id), function (err, results) {
      if (err) {
        console.log(err);
      } else {
        console.log(results);
        if (results != null) {
          res.status(200)
          .send(results);
        } else {
          res.status(404)
          .send();
        }
      }
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

  console.log("--------------------------------------------------------------");
  console.log("--> Starting [POST] /data/readings process...")
  console.log("--------------------------------------------------------------");

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

    console.log(req.body);
    let dateTimeString =  new Date().toISOString();

    if (Array.isArray(req.body)) {
      console.log("Array Element")
      for (let i = 0; i < req.body.length; i++) {
        req.body[i]["Time"] = dateTimeString;
      };
      const data = new Data(req.body);
      data.collection.insertMany(
        req.body
      ).then((docs) => {
        console.log(docs)
        res.status(201)
        .send(docs);
      }).catch((err) => {
        console.log(err)
      });
    } else {
      console.log("Single Element")
      req.body["Time"] = dateTimeString;
      const data = new Data(req.body);
      data.save((err, data) => {
        if (err) {
          res.status(500)
          .send({
            message: err
          });
          return;
        } else {
          console.log(data)
          res.status(201)
          .send(data);
        }
      });
    }

  } else {
    res.status(403)
      .send({
        message: "Unauthorized access"
      });
  }
});

// "teacher" only endpoint (auth required)
router.put("/data/readings/:id", verifyToken, function (req, res) {

  console.log("--------------------------------------------------------------");
  console.log("--> Starting [PUT] /data/readings/:id process...")
  console.log("--------------------------------------------------------------");

  const id = req.params.id;
  console.log(id);

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

    Data.findByIdAndUpdate(id, req.body, { new: true }, function (err, result) {
      if (err) {
        console.log(err);
      } else {
        console.log(result);
        res.status(200)
          .send(result);
      }
    });
  } else {
    res.status(403)
      .send({
        message: "Unauthorized access"
      });
  }
});

// "teacher" only endpoint (auth required)
router.patch("/data/readings/:id", verifyToken, function (req, res) {

  console.log("--------------------------------------------------------------");
  console.log("--> Starting [PATCH] /data/readings/:id process...")
  console.log("--------------------------------------------------------------");

  const id = req.params.id;
  console.log(id);

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

    Data.findByIdAndUpdate(id, req.body, { new: true }, function (err, result) {
      if (err) {
        console.log(err);
      } else {
        console.log(result);
        res.status(200)
          .send(result);
      }
    });
  } else {
    res.status(403)
      .send({
        message: "Unauthorized access"
      });
  }
});

// "student" or "teacher" endpoint (auth required)
router.get("/data/advanced/max-precipitation", verifyToken, function (req, res) {
  
  console.log("--------------------------------------------------------------");
  console.log("--> Starting [GET] /data/advanced/max-precipitation process...")
  console.log("--------------------------------------------------------------");
  
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
    
    // It's necessary to do an "aggregate", because precipitation field is string and has to be converted to double first
    Data.aggregate([
      { $addFields: { precipitation: { $toDouble: "$Precipitation mm/h" } } },
      { $sort: { precipitation: -1 } },
      { $limit: 1 }
    ], function (err, results) {
      if (err) {
        console.log(err);
      } else {
        console.log(results);
        res.status(200)
        .send(results);
      }
    });
  } else {
    res.status(403)
    .send({
      message: "Unauthorized access"
    });
  }
});

// "student" or "teacher" endpoint (auth required)
router.get("/data/query", verifyToken, function (req, res) {
  
  console.log("--------------------------------------------------------------");
  console.log("--> Starting [GET] /data/query process...")
  console.log("--------------------------------------------------------------");
  
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
    
    console.log(req.query)
    
    Data.find({
      "Device Name": req.query.station,
      "Time": { $gte: req.query.start, $lte: req.query.end }
    })
    .select({
      "Temperature (°C)": 1,
      "Temperature (°F)": 1,
      "Atmospheric Pressure (kPa)": 1,
      "Solar Radiation (W/m2)": 1,
      "Precipitation mm/h": 1,
      "Time": 1,
      "Device Name": 1,
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
  } else {
    res.status(403)
    .send({
      message: "Unauthorized access"
    });
  }
});

// "teacher" only endpoint (auth required)
router.delete("/data/readings/:id", verifyToken, function (req, res) {

  console.log("--------------------------------------------------------------");
  console.log("--> Starting [DELETE] /data/readings/:id process...")
  console.log("--------------------------------------------------------------");

  const id = req.params.id;
  console.log(id);

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

    Data.findByIdAndDelete(String(id),function (err, result) {
      if (err) {
        console.log(err);
      } else {
        console.log(result);
        if (result != null) {
          res.status(202)
          .send(result);
        } else {
          res.status(404)
          .send();
        }
      }
    });
  } else {
    res.status(403)
      .send({
        message: "Unauthorized access"
      });
  }
});


module.exports = router;
