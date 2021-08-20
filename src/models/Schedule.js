const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const scheduleSchema = new Schema({
    "flight" : {type: mongoose.Schema.Types.ObjectId, ref:'Flight'},
    "source" :{type: mongoose.Schema.Types.ObjectId, ref:'Airport'},
    "destination":{type: mongoose.Schema.Types.ObjectId, ref:'Airport' },
    "departureDate" : {type : Date, default: Date.now()},
    "arrivalDate" : {type : Date, default: Date.now()},
    "departureTime" : {type : Date, default: Date.now()},
    "arrivalTime" : {type : Date, default: Date.now()},
    "capacity":{type : Number},
    "occupied":{type : Number},
    "fare":{type : Number},
    "available" : {type : Boolean, default:true}
});

module.exports = mongoose.model('Schedule', scheduleSchema);