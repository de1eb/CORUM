const controller = {};

controller.createUser = require("./createUser");
controller.loginUser = require("./loginUser");
controller.checkUser = require("./checkUser");
controller.logoutUser = require("./logoutUser");
controller.jwtMiddleware = require("./jwtMiddleware");
module.exports = controller;
