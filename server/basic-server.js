/* Import node's http module: */
var http = require('http');
var requestHandler = require('./request-handler.js');
var url = require('url');

var port = 3000;

var ip = '127.0.0.1';

var headers = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10, // Seconds.
  'Content-Type': 'application/json'
};

var sendResponse = function(res, data, statusCode) {
  statusCode = statusCode || 200;
  res.writeHead(statusCode, headers);
  res.end(JSON.stringify(data));
};


var server = http.createServer( function(req, res) {
  console.log('Serving request type ' + req.method + ' for url ' + req.url);
  var parsedUrl = url.parse(req.url);
  var urlPath = parsedUrl.pathname;

  if (urlPath !== '/classes/messages') {
    sendResponse(res, null, 404);
  } else {
    requestHandler.requestHandler(req, res);
  }
});

console.log('Listening on http://' + ip + ':' + port);
server.listen(port, ip, () => {
  console.log('were running!');
});



