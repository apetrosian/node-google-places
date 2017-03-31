const querystring = require('querystring');
const options = require('./utils/options');
const request = require('./utils/request');

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

  return new Promise((resolve, reject) => {

    options.validate(params)
      .catch((reason) => {
        reject(reason);
      })
      .then((result) => {

        const reqestParams = {
          hostname: HOSTNAME,
          path: PATH + querystring.stringify(result)
        }

        return request(reqestParams);

      })
      .catch( error => {
        reject(error);
      })
      .then( result => {
        resolve(result);
      });
  });
};
