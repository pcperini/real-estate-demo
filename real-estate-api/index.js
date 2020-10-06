const express = require('express');
const app = express();
const port = process.env.PORT || 3001;

const cookieParser = require('cookie-parser');
app.use(cookieParser());
app.use(express.json());

app.use('/static', express.static('build/static'));

const middlewares = require('./middlewares');
middlewares.forEach(function(middleware) {
  app.use(middleware);
});

const routes = require('./routes');
routes.forEach(function(route) {
  route(app);
});

app.get('/(*)?', function(req, res) {
  console.log(__dirname + '/build/index.html');
  res.sendFile(__dirname + '/build/index.html');
});

app.listen(port, function() {
  console.log('Listing at ' + port);
});
