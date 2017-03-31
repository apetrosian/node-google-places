const querystring = require('querystring');
const options = require('./utils/options');
const request = require('./utils/request');

const HOSTNAME = 'maps.googleapis.com';
const PATH = '/maps/api/place/nearbysearch/json?';

/**
 * Google Places API returns list of nearest places
 *
 * @param {Object} params
 *
 * @return {Promise}
 */
module.exports = (params = {}) => {

  return options.validate(params).then((result) => {

      return request({
        hostname: HOSTNAME,
        path: PATH + querystring.stringify(result)
      });

    });
};
