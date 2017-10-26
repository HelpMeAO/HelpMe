'use strict';

/*********************/
/*** Require Logic ***/
/*********************/

// Add Express & API Router & Firebase + serviceAccount
var express = require("express");
var router = require("./routes/api");
var pagesRouter = require("./routes/pages");
var cookieParser = require("cookie-parser");
var auth = require("./routes/auth");

/*********************/
/*** Express Logic ***/
/*********************/

// Start express
var app = express();
app.use(cookieParser());

// Add routers
app.use("/", pagesRouter, cookieParser());
app.use('/api', router, cookieParser());
app.use('/auth', auth);

// Make static folders available
app.use("/css", express.static("css"));
app.use("/js", express.static("js"));
app.use("/img", express.static("img"));
app.use("/api", express.static("api"));

// The app is now running on port 80
app.listen(80);
console.log("Server is running on port 80!");
