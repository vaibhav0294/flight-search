const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const airportSchema = new Schema({
    "airportName" : {type:String, unique:[true, "Flight Code Already Exist"]},
    "airportCode" : {type :String}
});

module.exports = mongoose.model('Airport', airportSchema);