const mongoose = require('mongoose');
let Schema = mongoose.Schema;

/**
 * Data Schema
 */
let dataSchema = new Schema({
  "Atmospheric Pressure (kPa)": {
    type: String,
    required: true
  },
  "Device Name": {
    type: String,
    required: true
  },
  "Humidity (%)": {
    type: String,
    required: true
  },
  "Lightning Average Distance (km)": {
    type: String,
    required: true
  },
  "Lightning Strike Count": {
    type: String,
    required: true
  },
  "Location": {
    type: String,
    required: true
  },
  "Maximum Wind Speed (m/s)": {
    type: String,
    required: true
  },
  "Precipitation mm/h": {
    type: String,
    required: true
  },
  "Solar Radiation (W/m2)": {
    type: String,
    required: true
  },
  "Temperature (°C)": {
    type: String,
  },
  "Temperature (°F)": {
    type: String,
  },
  "Time": {
    type: String,
    required: true
  },
  "Vapor Pressure (kPa)": {
    type: String,
    required: true
  },
  "Wind Direction (°)": {
    type: String,
    required: true
  },
  "Wind Speed (m/s)": {
    type: String,
    required: true
  }
});

const collectionName = "weather_data"

module.exports = mongoose.model('Data', dataSchema, collectionName);
