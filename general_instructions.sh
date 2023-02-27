#!/bin/bash
################################################################################
# GENERAL INFORMATION SUMMARIZED
################################################################################

# Develop MongoDB REST API to interact with a large dataset of climate data.

# --> PART 1 - Selecting and preparing the NoSQL database
# --> PART 2 - RESTful API selection, creation, and testing
# --> PART 3 - RESTful API and MongoDB Integration
# --> PART 4 - Contingency task and knowledge concepts related to this project

# --> Confirm RESTful API functionality
# --> Build and test a RESTful API application
# --> Build and test REST API endpoints and corresponding methods
# --> Enable RESTful API cross-origin resource sharing (CORS)
# --> Work with HTTP methods (GET, POST, PUT, DELETE, PATCH)
# --> Secure RESTful API with authentication and authorization
# --> Document and test RESTful API
# --> Understand NoSQL databases and select the best NoSQL option for each implementation
# --> Work with NoSQL data storage options including partitioning and effective scale-out distribution
# --> Determine indexing needs and types of indexing in NoSQL
# --> Determine and implement time-to-live (TTL) operations

# Extra notes:
# --> The client is an educational institution that wants to use raw climate data.
# --> --> Link for the data is (use CSV format):
# --> --> https://data.nsw.gov.au/data/dataset/weather-station-atm41-realtime/resource/e655f85f-c69f-470d-97d3-ab6723866504?inner_span=True
# --> The interface is a Web-REST-API.
# --> The database must include a collection of "weather_data" and a colleciton of "users".
# --> "users" collection will store authentication and authorization per user type.
# --> User types are either "teacher" (db admin) or "student" (only able to read the data).
# --> Raw data is from an IoT community provided by NSW-Government (CSV version can be imported to MongoDB).
# --> Not all raw data is necessarily suitable for the mongodb schema, collections and documents.

# Technical requirements:
# --> Data persistence is required.
# --> Indexing - Based on the resulting schema, determine indexing needs to suit the scenario presented and create a single field index in a collection to optimise data retrieval and either a multikey index or a compound index to optimise data retrieval.
# --> TTL - Ability to automatically remove documents if the following condition occurs.
# --> --> A user has not logged in for 30 days
# --> Triggers – Two triggers are required.
# --> --> Update the location value in the dataset if the Longitude and Latitude values are modified
# --> --> Update the last login date of a user, whenever a user successfully queries the database
# --> Data encryption
# --> Authentication
# --> Authorization – three access levels (administrator, teacher, student)

# Operations 1:
# --> a) Insert a new reading for a weather station (single)
# --> b) Insert a new user (single)
# --> c) Insert new fields to record the temperature information in Fahrenheit (6 fields) (multiple)
# --> d) Find the maximum precipitation recorded in the last 5 Months (single)
# --> e) Find the temperature, atmospheric pressure, radiation and precipitation recorded by a specific station at a given date and time (hour) (multiple)
# --> f) Use a batch operation to retrieve data from two or more documents (it depends on your schema)
# --> g) Create a query that includes an index key
# --> h) Delete a user (single)
# --> i) Delete multiple users (multiple)
# --> j) Update a specific weather station longitude and latitude (single)
# --> k) Update access level for at least two users in the same query (multiple)

# Operations 2:
# --> a) Return a single value, using the GET method
# --> b) Return a collection of values, using the GET method
# --> c) Add a value to a collection using the POST method
# --> d) Update an existing value using the PUT method
# --> e) Update an existing value using the PATCH method
# --> f) Remove a specified item from a collection using the DELETE method

# Operations 3:
# --> Enable CORS for GET, POST, PUT & DELETE methods and confirm that cross-origin requests are allowed

# Operations 4:
# --> a) Insert a single data object
# --> b) Perform multiple inserts in a single operation
# --> c) Query a single object
# --> d) Use batch object to retrieve multiple objects in one operation
# --> e) Include an index in a query
# --> f) Create and run a query that returns multiple attributes
# --> g) Delete a single object
# --> h) Delete multiple objects
# --> i) Update a single object
# --> j) Update multiple objects
