var express = require('express');
var app = express();
var cors = require('cors');
var bodyParser = require('body-parser');
var handler = require('./handlers.js');
app.use(cors());
app.use(bodyParser.json())
app.use(express.static('client'));
app.listen(3000, () => console.log('twerkin on 3k bb'));
app.post('/', function (req, res){
	console.log('got it in post');
	var data = handler(req.body);
	console.log(data);
	res.statusCode = 201;
	res.send(data);
});