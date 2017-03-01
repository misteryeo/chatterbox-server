

var headers = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10, // Seconds.
  'Content-Type': 'application/json'
};

messages = [];

var count = 0;

exports.requestHandler = function(req, res) {

  console.log('Serving req type ' + req.method + ' for url ' + req.url);

  var statusCode = undefined;

  var urlArr = req.url.split('?');
  var urlPath = urlArr[0];
  // var options = urlArr[1];

  if (urlPath !== '/classes/messages') {
    statusCode = 404;
  } else if (req.method === 'OPTIONS') {
    console.log('its an Options!');
    statusCode = 204;
  } else if (req.method === 'GET') {
    console.log('its a get!');
    statusCode = 200;
  } else if (req.method === 'POST') {
    statusCode = 201;
    req.on('data', function(someData) {
      var message = JSON.parse(someData);
      message.objectId = count++;
      message.createdAt = count.toString();
      messages.push(message);
    });
  }

  res.writeHead(statusCode, headers);

  res.end(JSON.stringify({results: messages}));
};