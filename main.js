'use strict';

// Add Express & API Router
var express = require("express");
var router = require("./routes/api");
var pagesRouter = require("./routes/pages");

// Add the single-sign-on Router
// var auth = require("./routes/auth"); 

// Start express
var app = express();

// Add the Pages and API router
app.use("/", pagesRouter);
app.use('/api', router);
// app.use('/auth', auth);

// Make the CSS/JS/Images folder available
app.use("/css", express.static("css"));
app.use("/js", express.static("js"));
app.use("/img", express.static("img"));

// The app is now running on port 80
app.listen(80);
console.log("Server is running on port 80!");
