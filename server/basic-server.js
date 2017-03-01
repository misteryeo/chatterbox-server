/* Import node's http module: */
var http = require('http');
var requestHandler = require('./request-handler.js');
var urlParse = require('url');

var port = 3000;

var ip = '127.0.0.1';




var server = http.createServer( function(req, res) {
  console.log('Serving request type ' + req.method + ' for url ' + req.url);
  requestHandler.requestHandler(req, res);
});

console.log('Listening on http://' + ip + ':' + port);
server.listen(port, ip, () => {
  console.log('were running!');
});



