const request = require('request-promise-native');

const fetchMyIP = function() {
  return request('https://api.ipify.org/?format=json'); //returns promise of request for ip data, returned as a JSON string
};

const fetchCoordsByIP = function(body) {
  const ip = JSON.parse(body).ip;
  return request(`https://freegeoip.app/json/${ip}`)
};

const fetchISSFlyOverTimes = function(ip) {
  const latitude = JSON.parse(ip).latitude;
  const longitude = JSON.parse(ip).longitude;
  return request(`http://api.open-notify.org/iss-pass.json?lat=${latitude}&lon=${longitude}`)
}

module.exports = { fetchMyIP, fetchCoordsByIP };
