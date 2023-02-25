const dotenv = require("dotenv")
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");

let homeRoutes = require("./routes/home");
let usersRoutes = require("./routes/users");
let dataRoutes = require("./routes/data");

// Load ".env" file if it exists
dotenv.config()

const app = express();

// Disable cache 304 status-code
app.disable("etag");

// Configure "logging" for server requests
app.use(morgan("combined"));

// Allow all CORS
app.use(cors());

// Parse requests of content-type - application/json
app.use(express.json());

// Parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({extended: true}));

// Setup MongoDB database connection string for the API
const MONGO_USER = process.env.MONGO_USER;
const MONGO_PASSWORD = process.env.MONGO_PASSWORD;
const MONGO_ENDPOINT = process.env.MONGO_ENDPOINT;
const MONGO_CONNECTION_STRING = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_ENDPOINT}:27017/api_database`;
console.log("MONGO_CONNECTION_STRING: ", MONGO_CONNECTION_STRING);
try {
  // Connect to MongoDB
  mongoose.set("strictQuery", false); // For MongoDB connection warnings
  mongoose
  .connect(
    MONGO_CONNECTION_STRING,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  )
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));
} catch (error) {
  console.log("Error: ", error);
}
process.on('unhandledRejection', error => {
  console.log('unhandledRejection: ', error.message);
});

// Enable routes for different endpoints
app.use(homeRoutes);
app.use(usersRoutes);
app.use(dataRoutes);

// Setup server to listen on port from environment variable "APP_PORT"
const PORT = process.env.APP_PORT;
console.log("PORT: ", PORT);
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
