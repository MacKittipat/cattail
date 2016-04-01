var express = require('express');
var spawn = require('child_process').spawn;

var app = express();
var portNumber = 8080;

var spawnTail;
app.get('/cattail', function(req, res) {

  spawnTail = spawn('tail', ['-f', 'PATH']);
  res.header('Content-Type','text/html;charset=utf-8');

  spawnTail.stdout.on('data', function(data) {
    res.write(data.toString().split("\n")
      .join("<br /><script>window.scrollTo(0,document.body.scrollHeight);</script>"),'utf-8');
  });

  spawnTail.on('exit', function(code) {
    res.end(code);
  });

});

app.listen(portNumber, function () {
  console.log('App listening on port ' + portNumber);
});
