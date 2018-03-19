var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  passportLocalMongoose = require('passport-local-mongoose'),
  landmark = require('./landmark')

var UserSchema = new Schema({
  username: String,
  password: String,
  email: String,
  location: String,
  landmark: {type: Schema.Types.ObjectId, ref: 'Landmark'} //referencing schema in a schema
});

UserSchema.plugin(passportLocalMongoose);

var User = mongoose.model('User', UserSchema);
module.exports = User;
