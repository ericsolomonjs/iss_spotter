const request = require("request");

/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */
let IP;

const fetchMyIP = (callback) => {
  let fnError;
  // use request to fetch IP address from JSON API
  request("http://api.ipify.org", (error, response, body) => {
    if (error) return callback(error, IP);
    IP = body;
    if (IP === undefined) {
      fnError = "IP Undefined";
      callback(fnError, IP);
      return;
    }
    //check for statuscode errors;
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    callback(fnError, IP);
    //callback function call with error and IP values sent over
  });
};

module.exports = { fetchMyIP };