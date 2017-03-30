const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY || null;
const HOSTNAME = 'maps.googleapis.com';
const PATH = '/maps/api/place/nearbysearch/json?';
const https = require('https');
const querystring = require('querystring');

/**
 * Google Places API returns list of nearest places
 *
 * @param {Object} options
 *
 * @return {Promise}
 */
module.exports = (options) => {

  options = options || {};

  const result = new Promise((resolve, reject) => {

    if(!GOOGLE_API_KEY) {
      return reject('Missing params: Please specify Google API key');
    } else {
      options.key = GOOGLE_API_KEY;
    }

    if(!options.location) {
      return reject('Missing params: Please specify location coordinates');
    }

    if(!options.radius) {
      return reject('Missing params: Please specify radius');
    }

    if(!options.type) {
      return reject('Missing params: Please specify type');
    }

    let params = {
      hostname: HOSTNAME,
      path: PATH + querystring.stringify(options)
    }

    https.get(params, (response) => {
      let body ='';

      response.on('data', (chunk) => {
          body += chunk;
      });

      response.on('end', () => {
        let places = JSON.parse(body);
        resolve(places.results);
      });

    }).on('error', (e) => { reject('Request error: ' + e.message); });

  });

  return result;
};
