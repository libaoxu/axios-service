if (process && process.env && process.env.NODE_ENV === 'production') {
  module.exports = require('./dist/axios-service.production.min.js');
} else {
  module.exports = require('./dist/axios-service.development.js');
}
