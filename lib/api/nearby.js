const https = require('https');
const querystring = require('querystring');
const options = require('./options')

const HOSTNAME = 'maps.googleapis.com';
const PATH = '/maps/api/place/nearbysearch/json?';

/**
 * Google Places API returns list of nearest places
 *
 * @param {Object} options
 *
 * @return {Promise}
 */
module.exports = (params = {}) => {

  const result = new Promise((resolve, reject) => {

    options.validate(params)
      .then((result) => {

        const reqestParams = {
          hostname: HOSTNAME,
          path: PATH + querystring.stringify(result)
        }

        https.get(reqestParams, (response) => {
          let body = '';

          response.on('data', (chunk) => {
              body += chunk;
          });

          response.on('end', () => {
            const places = JSON.parse(body);
            resolve(places.results);
          });

        }).on('error', (e) => {
          reject('Request error: ' + e.message);
        });
      })
      .catch((reason) => {
        reject(reason);
      });
  });

  return result;
};
