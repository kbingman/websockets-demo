var fs = require('fs'),
    union = require('union');

var server = union.createServer({
  before: [
    function (request, response) {
      fs.readFile(__dirname + '/index.html',
      function (err, data) {
        if (err) {
          response.writeHead(500);
          return response.end('Error loading index.html');
        }
        
        response.writeHead(200, { 'Content-Type': 'text/html' })
        response.end(data);
      });
    }
  ]
});

server.listen(9090);

var io = require('socket.io').listen(server);

io.sockets.on('connection', function(socket) {
  socket.emit('news', {hello: 'mars'});
  socket.on('my other event', function(data) {
    console.log(data);
  });
});