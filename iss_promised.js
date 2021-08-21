const request = require('request-promise-native');

const fetchMyIP = function() {
  return request('https://api.ipify.org/?format=json'); //returns promise of request for ip data, returned as a JSON string
};

module.exports = { fetchMyIP };
