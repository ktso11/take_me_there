var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var UserSchema = new Schema({
  name: String,
  password: String,
  email: String,
  location: String,
  lankmark: String //referencing schema in a schema
});



var User = mongoose.model('User', UserSchema);
module.exports = User;
