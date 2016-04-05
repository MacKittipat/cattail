var express = require('express');
var spawn = require('child_process').spawn;
var AnsiToHtml = require('ansi-to-html');

var app = express();
var portNumber = 8080;
var ansiToHtmlOpt = {
  fg: '#000',
  bg: '#FFF',
  newline: true,
  escapeXML: false,
  stream: false,
}
var ansiToHtml = new AnsiToHtml(ansiToHtmlOpt);

var spawnTail;
app.get('/cattail', function(req, res) {
  var path = req.query.path;
  spawnTail = spawn('tail', ['-f', path]);
  res.header('Content-Type','text/html;charset=utf-8');

  spawnTail.stdout.on('data', function(data) {
    res.write(ansiToHtml.toHtml(data.toString() + '<script>window.scrollTo(0,document.body.scrollHeight);</script>'),'utf-8');
  });

  spawnTail.on('exit', function(code) {
    res.end(code);
  });

});

app.listen(portNumber, function () {
  console.log('App listening on port ' + portNumber);
});
