const
  env = process.env,
  express = require('express')
var app = express()

app.get('/', function (req, res) {
  res.send('Hello World')
})

app.get('/health', function(req, res) {
	res.send('OK')
})

app.listen(3000)


app.listen(env.NODE_PORT || 3000, env.NODE_IP || 'localhost', function () {
  console.log(`Application worker ${process.pid} started...`);
});
