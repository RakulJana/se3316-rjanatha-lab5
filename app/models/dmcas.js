var mongoose = require('mongoose'); // to use mongo
var Schema = mongoose.Schema;
// basic schema for now, will add other auth levels later
var DmcaSchema = new Schema({
    policyOne: String,
    policyTwo: String,
    policyThree: String
});
// export the user schema
module.exports = mongoose.model('Dmca', DmcaSchema);