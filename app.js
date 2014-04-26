
/**
 * Module dependencies
 */

var express = require('express'),
  routes = require('./routes'),
  http = require('http'),
  path = require('path');

var app = module.exports = express();

var Mongoose = require('mongoose');
var db = Mongoose.createConnection('mongodb:///tmp/mongodb-27017.sock/app');

var UserSchema = require('./models/User.js').UserSchema;
var User = db.model('users', UserSchema);


/**
 * Configuration
 */

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.static(path.join(__dirname, 'public')));
app.use(app.router);

// development only
if (app.get('env') === 'development') {
  app.use(express.errorHandler());
}

// production only
if (app.get('env') === 'production') {
  // TODO
}


/**
 * Routes
 */

// serve index and view partials
app.get('/', routes.index(User));
app.get('/partials/:name', routes.partials);
app.get('/users.json', routes.get(User));

app.put('/user/:id.json', routes.update(User));

app.post('/user.json', routes.addUser(User));

// redirect all others to the index (HTML5 history)
app.get('*', routes.index(User));


/**
 * Start Server
 */

http.createServer(app).listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});
