var mongoose = require('mongoose'); // to use mongo
var Schema = mongoose.Schema;

var ReviewSchema = new Schema({
    rating: Number,
    reviewdes: String,
    reviewname: String
});
var SongSchema = new Schema({
    stitle: String,
    sartist: String,
    salbum: String,
    syear: Number,
    strack: String,
    sgenre: String,
    reviews: [ReviewSchema]

});
// export the user schema
module.exports = mongoose.model('Song', SongSchema);
//module.exports = mongoose.model('Review', ReviewSchema);