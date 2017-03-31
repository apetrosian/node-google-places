const https = require('https');

module.exports = (params) => {
  return new Promise((resolve, reject) => {

    https.get(params, (response) => {
      let body = '';

      response.on('data', (chunk) => {
          body += chunk;
      });

      response.on('end', () => {

        try {
          const places = JSON.parse(body);
          resolve(places.results);
        } catch(e) {
          reject('Parsing error: ' + e.message);
        }

      });

    }).on('error', (e) => {
      reject('Request error: ' + e.message);
    });
  });
};
