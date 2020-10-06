const auth = require('../middlewares/auth');

module.exports = function(app) {
  app.get('/api/listings', auth(), function(req, res) {
    const query = req.db.all(
      'SELECT *, ' +
      '(SELECT true FROM favorites WHERE ' +
      'favorites.user_id=:user_id AND favorites.listing_id=listings.id) ' +
      'AS favorited FROM listings',
      { ':user_id': req.auth.userId }
    );
    query.then(function(listings) {
      res.json(listings);
    });
  });

  app.get('/api/listings/:id', auth(), function(req, res) {
    const query = req.db.get(
      'SELECT listings.*, ' +
      'users.id AS agent_id, users.email AS agent_email, ' +
      'users.phone AS agent_phone, users.name AS agent_name, ' +
      'users.profile_photo_url AS agent_profile_photo_url, ' +
      '(SELECT true FROM favorites WHERE ' +
      'favorites.user_id=:user_id AND favorites.listing_id=listings.id) ' +
      'AS favorited FROM listings OUTER LEFT JOIN users ' +
      'ON users.id=listings.agent_id ' +
      'WHERE listings.id=:id',
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
