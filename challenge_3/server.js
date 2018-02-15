var express = require('express');
var app = express();
app.use(express.static('client'));
app.use('/node_modules', express.static('node_modules'));
app.listen(3000, () => {console.log('listening on 3k :O)');});

