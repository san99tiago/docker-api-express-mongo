#!/bin/bash

################################################################################
# CREATION OF DATABASES, USERS AND INNER COLLECTIONS
################################################################################

# Create the "api_user" user in the "api_database" (write password when prompted)
use api_database
db.createUser(
  {
    user: "api_user",
    pwd:  passwordPrompt(),
    roles: ["readWrite"]
  }
)

# Create the necessary collections ("weather_data" and "users")
db.createCollection("weather_data")
db.createCollection("users")

# Create the necessary TTL configuration for "users" "lastLogin" index and delete if expired ("30" days are "2592000" seconds)
db.users.createIndex(
  { lastLogin: 1 },
  { expireAfterSeconds: 2592000 }
)


################################################################################
# DATA LOADING (IMPORT) FROM CSV TO MONGO
################################################################################

# 1. Open MongoDB Compass
# 2. Connect to MongoDB with a user that has "ReadWrite" permissions to the "api_database".
# 3. Select the "api_database" in the UI and then select "weather_data" in the UI.
# 4. Click on "ADD DATA" option in the UI.
# 5. Select:
#    --> For "Select File" option, choose raw-data "CSV" file.
#    --> For "Input File Type", choose "CSV".
#    --> For "Delimiter", choose "semicolon".
#    --> For "Specify Fields and Types", choose the necessary ones based on schema.
# 6. Click on "Import".


################################################################################
# TROUBLESHOOTING
################################################################################

# Show existing collections in "api_database"
use api_database
show collections

# See details of a given user in "api_database"
use api_database
db.getUser( "api_user", {
    showCredentials: 1,
    showCustomData: 1,
    showPrivileges: 1,
    showAuthenticationRestrictions: 1
  }
)

# Show all users in the "api_database" under the "users" collection
use api_database
db.users.find()

# Show "admin" users in the "api_database" under the "users" collection
use api_database
db.users.find({"role": "admin"}, {fullName: 1, email: 1, role: 1})

# Show existing indexes in "api_database" under the "users" collection
use api_database
db.users.getIndexes()


################################################################################
# DELETION (WARNING ZONE)
################################################################################

# If you ever need to delete the users (warning, only for cleaning)
use api_database
db.dropUser("api_user")

# If you ever need to delete the collections (warning, only for cleaning)
use api_database
db.users.drop()
db.weather_data.drop()
