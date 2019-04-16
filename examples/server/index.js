var fs = require('fs');
var url = require('url');
var path = require('path');
var http = require('http');
var server;
var dirs;

function listDirs(root) {
  var files = fs.readdirSync(root);
  var dirs = [];

  for (var i = 0, l = files.length; i < l; i++) {
    var file = files[i];
    if (file[0] !== '.') {
      var stat = fs.statSync(path.join(root, file));
      if (stat.isDirectory()) {
        dirs.push(file);
      }
    }
  }

  return dirs;
}


function sendResponse(res, statusCode, body) {
  res.writeHead(statusCode);
  res.write(body);
  res.end();
}

function send200(res, body) {
  sendResponse(res, 200, body || '<h1>OK</h1>');
}

function send404(res, body) {
  sendResponse(res, 404, body || '<h1>Not Found</h1>');
}

function pipeFileToResponse(res, file, type) {
  if (type) {
    res.writeHead(200, {
      'Content-Type': type
    });
  }
  fs.createReadStream(path.join(__dirname, file)).pipe(res);
}


dirs = listDirs(__dirname);


server = http.createServer(function (req, res) {
  var url = req.url;
  var origin = req.headers.origin

  var writeHead = res.writeHead.bind(res)

  res.writeHead = function (status, params) {
    writeHead(status, Object.assign({
      'Content-Type': 'application/json; charset=utf-8',
      'Access-Control-Allow-Credentials': true,
      'Access-Control-Allow-Origin': origin,
      'Access-Control-Allow-Headers': 'X-Requested-With, Content-Type, ticket',
      'Access-Control-Allow-Methods': 'PUT, POST, GET, DELETE, OPTIONS',
    }, params || {}))
  }


  if (fs.existsSync(path.join(__dirname, url + '.js'))) {
    require(path.join(__dirname, url + '.js'))(req, res);
  } else {
    send404(res);
  }
});

server.listen(3801);
console.log('api ready! listen on: http://localhost:3801')
