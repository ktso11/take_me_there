var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var LandmarkSchema = new Schema({
  name: String
});


var Landmark = mongoose.model('Landmark', LandmarkSchema);
module.exports = Landmark;
