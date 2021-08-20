
module.exports.flightSearchResponse = (schedules) => {
    let response = schedules.map( (s)=> {
        console.log(s)

        let obj = {
            scheduleId : s._id,
            source : s.source,
            destination: s.destination,
            flight : s.flight,
            departureDate : new Date(s.departureDate).toDateString(),
            arrivalDate : new Date(s.arrivalDate).toDateString(),
            departureTime : new Date(s.departureTime).toTimeString(),
            arrivalTime : new Date(s.arrivalTime).toTimeString(),
            available: s.available,
            capacity : s.capacity,
            occupied : s.occupied
        }
        return obj;
    })
    return response;
}