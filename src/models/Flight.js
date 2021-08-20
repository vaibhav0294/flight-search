const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const flightsSchema = new Schema({
    "flightCode" : {type:String, unique:[true, "Flight Code Already Exist"]},
    "airline" : {type :String}
});

module.exports = mongoose.model('Flight', flightsSchema);