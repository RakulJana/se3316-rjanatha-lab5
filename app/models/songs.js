var mongoose = require('mongoose'); // to use mongo
var Schema = mongoose.Schema;

var ReviewSchema = new Schema({
    rating: Number,
    reviewdes: String,
    reviewname: String
});
var SongSchema = new Schema({
    songname: String,
    songartist: String,
    reviews: [ReviewSchema]

});
// export the user schema
module.exports = mongoose.model('Song', SongSchema);
//module.exports = mongoose.model('Review', ReviewSchema);