if (process.env.NODE_ENV === 'production') {
  module.exports = require('./lib/base-module-template.production.min.js');
} else {
  module.exports = require('./lib/base-module-template.development.js');
}
