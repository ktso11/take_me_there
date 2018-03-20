var mongoose = require("mongoose");

mongoose.connect( process.env.MONGODB_URI || "mongodb://localhost/takemethere-app" );
mongoose.Promise = global.Promise;


module.exports.User = require("./user.js");
module.exports.Landmark = require("./landmark.js");
