const request = require('request-promise-native');

const fetchMyIP = function() {
  return request('https://api.ipify.org/?format=json'); //returns promise of request for ip data, returned as a JSON string
};

const fetchCoordsByIP = function(body) {
  const ip = JSON.parse(body).ip;
  return request(`https://freegeoip.app/json/${body}`)
}

module.exports = { fetchMyIP };
