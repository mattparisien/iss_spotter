const { 
  fetchMyIP, 
  fetchCoordsByIP, 
  fetchISSFlyOverTimes, 
  nextISSTimesForMyLocation 
} = require('./iss');

// nextISSTimesForMyLocation((err, passTimes) => {
//   if (error) {
//     console.log('It didn\'t work!', e
// })


// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }
// }

// fetchCoordsByIP(ip, (error, coordinates) => {
//     if (error) {
//       console.log('There has been an error.');
//       return;
//     }
//   }

//   fetchISSFlyOverTimes(coordinates, (error, data) => {
//     if (error) {
//         throw error;
//       }
//       console.log(data);
//     });


    

nextISSTimesForMyLocation((error, times) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  console.log(times);
});

const printTimes = function(times) {
  for (const pass of times) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  }
};

