let Data = require("../models/data");

function createLocationTriggers(db) {
  // Setting triggers for mongo
  console.log("Setting up triggers");

  // Configure change stream on the Data model
  const collection = db.collection('weather_data');
  const changeStream = collection.watch();

  // Listen for 'change' events on the change stream
  changeStream.on('change', function(change) {
    console.log("Starting change trigger...");
    // Check if the change matches the 'Location' field filter
    if (change.operationType === 'update' && change.updateDescription.updatedFields.Location !== undefined) {
      // Find all documents with the old location value and update them
      console.log("change")
      console.log(change)

      const documentId = change.documentKey["_id"];
      const updatedLocation = change.updateDescription.updatedFields.Location;

      Data.findById(documentId, function (err, result) {
        if (err) {
          console.log(err);
        } else {
          console.log(result);
          const deviceName = result["Device Name"];
          Data.updateMany(
            { "Device Name": deviceName },
            { Location: updatedLocation },
            function(err, result) {
              if (err) throw err;
              console.log(result);
            }
          );
        }
      });

    }
  });
}

module.exports = createLocationTriggers;
