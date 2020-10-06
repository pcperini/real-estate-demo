const auth = require('../middlewares/auth');

module.exports = function(app) {
  app.put('/api/favorites/:listing_id', auth(), function(req, res) {
    const query = req.db.run(
      'INSERT OR IGNORE INTO favorites(user_id, listing_id) ' +
      'VALUES(:user_id, :listing_id)',
      {
        ':user_id': req.auth.userId,
        ':listing_id': req.params.listing_id
      }
    );

    query.then(function(transaction) {
      res.status(204);
      res.send('');
      return;
    });
  });

  app.delete('/api/favorites/:listing_id', auth(), function(req, res) {
    const query = req.db.run(
      'DELETE FROM favorites WHERE user_id = :user_id AND ' +
      'listing_id = :listing_id',
      {
        ':user_id': req.auth.userId,
        ':listing_id': req.params.listing_id
      }
    );

    query.then(function(transaction) {
      if (transaction.changes !== 1) {
        res.status(404);
        res.send('');
        return;
      }

      res.status(204);
      res.send('');
      return;
    });
  });
};
