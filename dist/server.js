"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var config_1 = require("./config/config");
var express_1 = require("./config/express");
var express = require("express");
var path = require("path");
express_1.default.use(express.static(__dirname + '/public'));
express_1.default.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname + '/public/index.html'));
});
express_1.default.listen(config_1.Config.PORT, function (err) {
    err ?
        console.error("Server error: " + err) :
        console.log("Server listening on port " + config_1.Config.PORT);
});
