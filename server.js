const
  env = process.env,
  express = require('express'),
  ThinkerRepo = require('./thinker-repo'),
  fs = require('fs'),
  bodyParser = require('body-parser')
;


var filename = "./secret.json";
var configBuf = fs.readFileSync(filename, "utf8");

var config = JSON.parse(configBuf);

var couchConfig = config.couch;
var thinkerRepo = new ThinkerRepo(couchConfig);

// var last = thinkerRepo.readLast(10);
// console.log(last);


var app = express()
app.use( bodyParser.json() );
app.use(bodyParser.urlencoded({extended: true})); 

app.get('/', function (req, res) {
  res.send('Hello World');
});

app.get('/health', function(req, res) {
	res.send('OK');
});

app.post('/api/thought', function(req, res) {
  // thinkerRepo.create(1)
  console.log('creating thought with body as follows');
  console.log(req.body);
  res.send('created');
})

app.get('/api/thought/last/:lastno', function(req, res) {	
  var no = req.params.lastno;  
  console.log('querying for last '+no+' thoughts');
  var lastdocs = thinkerRepo.readLast(no, function(err, docs){
  	if (!err) {
  		res.send(docs);
  	} else {
  		console.log('error '+err);
  		res.status(500).send('error '+err);
  	}
  });
  
})

app.listen(3000)


app.listen(env.NODE_PORT || 3000, env.NODE_IP || 'localhost', function () {
  console.log(`Application worker ${process.pid} started...`);
});



