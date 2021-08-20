const mongoose = require('mongoose');
const controller = require('./src/controllers/controller');


let conn = null;
const uri =  process.env.DB_CONNICTION;

exports.handler = async function(event,context ) {
  context.callbackWaitsForEmptyEventLoop = false;
  
  let path = event.path;
  let result = null;

  if (conn == null) {

    conn = mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      bufferCommands: false, // Disable mongoose buffering
      serverSelectionTimeoutMS: 2500
    });

   try {
        await conn;    
    }catch(error){
        console.log(error);
        return {"statusCode" : 503, "error":JSON.stringify(error)};        
    }
  }
  
  if(path=='null' || path==undefined || path == ''){
     return {"statusCode" : 404, "body":JSON.stringify("Route NotFound")};
  }else{
    switch(path) {
      case '/listAirports' : result = controller.listAirports(event);
        break;
      case '/flightSearch'  : result =  controller.searchFlights(event);
        break;
    }
  }
  return result;
};