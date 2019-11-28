var mongoose = require('mongoose'); // to use mongo
var Schema = mongoose.Schema;
// basic schema for now, will add other auth levels later
var UserSchema = new Schema({
    name: String,
    pass: String,
    verificationC: String,
    verified: Boolean,
    disabled: Boolean,
    admin: Boolean

});
// export the user schema
module.exports = mongoose.model('User', UserSchema);