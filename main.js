'use strict';

// Add Express & API Router
var express = require("express");
var router = require("./routes/api");
var pagesRouter = require("./routes/pages");

// Start express
var app = express();

// Add the Pages and API router
app.use("/", pagesRouter)
app.use('/api', router);

// Make the CSS/JS folder available
app.use("/css", express.static("css"));
app.use("/js", express.static("js"));

// The app is now running on port 80
app.listen(80);
console.log("Server is running on port 80!");
