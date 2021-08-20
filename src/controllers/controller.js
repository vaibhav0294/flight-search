const mongoose = require('mongoose');
require("./../models/Airport");
const  Airport = mongoose.model('Airport');
require("./../models/Schedule");
const  Schedule = mongoose.model('Schedule');
require('../models/Flight');
const  Flight = mongoose.model('Flight');
const responseMapper  = require('./../utils/responseMapper');


module.exports.listAirports = async (event) =>{
    console.log("listAirports function called")

  try{
    const doc = await Airport.find();
    if(doc=='null' || doc == undefined || doc == '' ){
        return {"statusCode" : 404, "body":JSON.stringify("No Airport Found")};
    }else{
       return {"statusCode" : 200, "body":JSON.stringify(doc)};   
    }  
  }catch(error){
   return {"statusCode" : 500, "body":JSON.stringify(error.messgae)};
  }
} 

module.exports.searchFlights = async (event) =>{
  try{
        const {source,destination,departureDate}  = event.queryStringParameters;
        let query = '';
        if(departureDate){
            query = { source,destination,$expr: {$eq: [departureDate, { $dateToString: {date: "$departureDate", format: "%Y-%m-%d"}}]}};
        }else{
            query = { source,destination}
        }
        const doc = await Schedule.find(query)
        .populate('flight')
        .populate('source')
        .populate('destination')
        
        if(doc=='null' || doc == undefined || doc == '' ){
            return {"statusCode" : 404, "body":JSON.stringify("No Flight Found")};
        }else{
            let result = responseMapper.flightSearchResponse(doc);
           return {"statusCode" : 200, "body":JSON.stringify(result)};   
        }  
  }catch(error){
    return  {"statusCode" : 502, "body":JSON.stringify(error.message)};
  }
}

