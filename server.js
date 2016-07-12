const
  env = process.env,
  express = require('express'),
  ThinkerRepo = require('./thinker-repo'),
  fs = require('fs');


var filename = "./secret.json";
var configBuf = fs.readFileSync(filename, "utf8");

var config = JSON.parse(configBuf);

var couchConfig = config.couch;
var thinkerRepo = new ThinkerRepo(couchConfig);
var last = thinkerRepo.readLast(10);
console.log(last);


var app = express()

app.get('/', function (req, res) {
  res.send('Hello World');
});

app.get('/health', function(req, res) {
	res.send('OK');
});

app.get('/api/create', function(req, res) {
  thinkerRepo.create(1)
  res.send('created')
})

app.listen(3000)


app.listen(env.NODE_PORT || 3000, env.NODE_IP || 'localhost', function () {
  console.log(`Application worker ${process.pid} started...`);
});



