var express = require('express');
var bp = require('body-parser');
var path = require('path');
var session = require('express-session')


app = express();

var root = __dirname;
var port = 8000;

app.set('trust proxy', 1)
app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true,
  cookie: { secure: false }
}))

app.use(express.static(path.join(root, './client')));
app.use(express.static(path.join(root, './bower_components')));

app.use(bp.json());
//MONGOOSE BEFORE ROUTES
require('./server/config/mongoose.js');
require('./server/config/routes.js')(app);

app.listen(port, function(){
  console.log(`Server running on port ${port}`);
})
