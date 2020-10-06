const sqlite3 = require('sqlite3');
const open = require('sqlite').open;
sqlite3.verbose();

module.exports = function(req, res, next) {
  open({
    filename: 'real-estate-db.db',
    driver: sqlite3.Database
  }).then(function(db) {
    req.db = db;
    next();
  });
};
