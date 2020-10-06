const auth = require('../middlewares/auth');

module.exports = function(app) {
  app.get('/api/agents/:id/listings', auth(), function(req, res) {
    const query = req.db.get(
      'SELECT *, ' +
      '(SELECT true FROM favorites WHERE ' +
      'favorites.user_id=:user_id AND favorites.listing_id=listings.id) ' +
      'AS favorited FROM listings WHERE ' +
      'agent_id=:id',
      {
        ':user_id': req.auth.userId,
        ':id': req.params.id
      }
    );

    query.then(function(listing) {
      res.json(listing);
    });
  });
};
