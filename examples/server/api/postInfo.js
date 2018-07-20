const { sucessResponse } = require('../utils')

var userInfo = {
  name: '李宝旭',
  name_en: 'libaoxu',
  email: 'libaoxu520@gmail.com',
  github: 'https://github.com/libaoxu',
}

module.exports = function (req, res) {
  res.writeHead(200)
  res.write(JSON.stringify(sucessResponse(userInfo)));
  res.end();
};
