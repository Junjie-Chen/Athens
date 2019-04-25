const express = require('express');
const expressGraphQL = require('express-graphql');

// Create a new Express application
const app = express();

const models = require('./models');

if (process.env.NODE_ENV !== 'production') {
  require('../keys');
}

const MONGODB_ATLAS_CONNECTION_STRING = process.env.MONGODB_ATLAS_CONNECTION_STRING;

if (!MONGODB_ATLAS_CONNECTION_STRING) {
  throw new Error('You must provide a MongoDB Atlas connection string.');
}

const mongoose = require('mongoose');

// Mongoose's built in promise library is deprecated, replace it with ES2015 Promise
mongoose.Promise = global.Promise;

// Connect to the mongoDB instance and log a message
// on success or failure
mongoose.connect(MONGODB_ATLAS_CONNECTION_STRING, { useMongoClient: true });
mongoose.connection
  .once('open', () => console.log('Connected to MongoLab instance.'))
  .on('error', error => console.log('Error connecting to MongoLab:', error));

const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

// Configures express to use sessions.  This places an encrypted identifier
// on the users cookie.  When a user makes a request, this middleware examines
// the cookie and modifies the request object to indicate which user made the request
// The cookie itself only contains the id of a session; more data about the session
// is stored inside of MongoDB.
app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: 'aaabbbccc',
  store: new MongoStore({
    url: MONGODB_ATLAS_CONNECTION_STRING,
    autoReconnect: true
  })
}));

const passport = require('passport');
const passportConfig = require('./services/auth');

// Passport is wired into express as a middleware. When a request comes in,
// Passport will examine the request's session (as set by the above config) and
// assign the current user to the 'req.user' object.  See also servces/auth.js
app.use(passport.initialize());
app.use(passport.session());

const schema = require('./schema/schema');

// Instruct Express to pass on any request made to the '/graphql' route
// to the GraphQL instance.
app.use('/graphql', expressGraphQL({
  schema,
  graphiql: true
}));

// Webpack runs as a middleware.  If any request comes in for the root route ('/')
// Webpack will respond with the output of the webpack process: an HTML file and
// a single bundle.js output of all of our client side Javascript
const webpackMiddleware = require('webpack-dev-middleware');
const webpack = require('webpack');
const webpackConfig = require('../webpack.config.js');

app.use(webpackMiddleware(webpack(webpackConfig)));

module.exports = app;
