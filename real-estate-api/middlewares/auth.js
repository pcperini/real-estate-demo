module.exports = function(scopes) {
  scopes = scopes || [];
  return function(req, res, next) {
    let sql = (
      'SELECT users.id FROM sessions LEFT OUTER JOIN users ' +
      'ON sessions.user_id=users.id LEFT OUTER JOIN permissions ' +
      'ON sessions.user_id=permissions.user_id ' +
      'WHERE sessions.session_token=:session_token ' +
      'AND sessions.expires_at>=strftime("%s", datetime(CURRENT_TIMESTAMP)) '
    );

    if (scopes.length > 0) {
      sql += (
        'AND ' +
        scopes.map(function(scope) {
          return 'permissions.' + scope + '=1'
        }).join(' AND ')
      );
    }

    const query = req.db.get(sql, {
      ':session_token': req.cookies.sessionToken
    });

    query.then(function(user) {
      if (!user) {
        res.status(401);
        res.json({ error: 'Invalid auth' });
        next('route');
        return;
      }

      req.auth = { userId: user.id };
      next();
    })
  };
};
