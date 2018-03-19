var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/takemethere-app");
mongoose.Promise = global.Promise;


module.exports.User = require("./user.js");
module.exports.Landmark = require("./landmark.js");
