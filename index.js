var express = require('express');
var app = express();
var sharejs = require('share');

var options = {
    db: {type: 'redis', client: redisClient}
};
sharejs.server.attach(app, options);

var redisClient;
console.log(process.env.REDISTOGO_URL);
if (process.env.REDISTOGO_URL) {
  var rtg   = require("url").parse(process.env.REDISTOGO_URL);
  redisClient = require("redis").createClient(rtg.port, rtg.hostname);
  redisClient.auth(rtg.auth.split(":")[1]);
} else {
  redisClient = require("redis").createClient();
}

app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.render('pad');
})

app.get('/(:id)', (req, res) => {
    res.render('pad');
})

var port = process.env.PORT || 8000;
app.listen(port);