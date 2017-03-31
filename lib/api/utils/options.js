const messages = require('./messages');

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY || null;

module.exports = {
  validate: function(options) {
    return new Promise((resolve, reject) => {

      const validationMessages = [];

      options.key = GOOGLE_API_KEY;

      if(!GOOGLE_API_KEY) {
        validationMessages.push(messages['MISSING_API_KEY']);
      }

      if(!options.location) {
        validationMessages.push(messages['MISSING_LOCATION']);
      }

      if(!options.radius) {
        validationMessages.push(messages['MISSING_RADIUS']);
      }

      if(!options.type) {
        validationMessages.push(messages['MISSING_TYPE']);
      }

      if(validationMessages.length) {
        reject(validationMessages);
      } else {
        resolve(options);
      }

    });
  }
}
