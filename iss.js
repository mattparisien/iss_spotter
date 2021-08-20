const request = require('request');

const fetchMyIP = function(callback) {
  // use request to fetch IP address from JSON API
  request('https://api.ipify.org/?format=json', (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    callback(error, JSON.parse(body).ip);
  });
};

const fetchCoordsByIP = function(ip, callback) {
  request(`https://freegeoip.app/json/${ip}`, (error, response, body) => {
    if (error) callback(error, null); // callback includes error parameter and coordinates --> callback(error, null)

    if (response.statusCode !== 200) {
      callback(Error(`The server has responsed with a ${response.statusCode} status code.`), null);
    }

    const latitude = JSON.parse(body).latitude;
    const longitude = JSON.parse(body).longitude;

    callback(null, {latitude, longitude});
  });
};


const fetchISSFlyOverTimes = function(coords, callback) {
  request(`http://api.open-notify.org/iss-pass.json?lat=${coords.latitude}&lon=${coords.longitude}`, (error, response, body) => {
  if (response.statusCode !== 200) {
    callback(Error(`The server has responded with a ${response.statusCode}`), null)
  } else if (error) {
    callback(error, null)
  } 
    const info = JSON.parse(body).response;
    callback(null, info)
  })
};


const nextISSTimesForMyLocation = function(callback) {
  fetchMyIP((error, ip) => {
    if (error) {
      return callback(error, null);
    }

    fetchCoordsByIP(ip, (error, coordinates) => {
      if (error) {
        return callback(error, null);
      }

      fetchISSFlyOverTimes(coordinates, (error, data) => {
        if (error) {
          return callback(error, null);
        }

        callback(null, data);
      });
    });
  });
};


module.exports = { 
  fetchMyIP,
  fetchCoordsByIP,
  fetchISSFlyOverTimes,
  nextISSTimesForMyLocation
};