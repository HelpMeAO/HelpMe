'use strict';

/*********************/
/*** Require Logic ***/
/*********************/

// Add Express & API Router & Firebase + serviceAccount
var express = require("express");
var router = require("./routes/api");
var pagesRouter = require("./routes/pages");

// Add the single-sign-on Router
// var auth = require("./routes/auth");

/*********************/
/*** Express Logic ***/
/*********************/

// Start express
var app = express();

// Add routers
app.use("/", pagesRouter);
app.use('/api', router);
// app.use('/auth', auth);

// Make static folders available
app.use("/css", express.static("css"));
app.use("/js", express.static("js"));
app.use("/img", express.static("img"));
app.use("/api", express.static("api"));

// The app is now running on port 80
app.listen(80);
console.log("Server is running on port 80!");
