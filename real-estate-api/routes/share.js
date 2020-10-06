const auth = require('../middlewares/auth');
const hat = require('hat');

module.exports = function(app) {
  app.post('/api/share/:id', auth(), function(req, res) {
    let url = 'http://' + req.hostname + '/listings/' + req.params.id;
    const accessCode = hat();

    const query = req.db.get(
      'SELECT rep_sale FROM permissions WHERE user_id=:id',
      { ':id': req.params.id }
    );

    query
      .then((permissions) => {
        if (!permissions.rep_sale) {
          return false;
        }

        return req.db.run(
          'INSERT OR IGNORE INTO users(email, access_code) ' +
          'VALUES(:email, :access_code)',
          {
            ':email': req.body.with,
            ':access_code': accessCode
          }
        );
      })
      .then(function(user) {
        if (user && user.lastID) {
          url += '?c=' + accessCode;
        }

        res.json({ url });
      });
  });
};
