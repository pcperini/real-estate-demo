const hat = require('hat');
const expiryDuration = 12 /* hours */ * 60 /* minutes */ * 60000 /* ms */;

module.exports = function(app) {
  app.post('/api/login', function(req, res) {
    let query;
    if (req.body.hash) {
      query = req.db.get(
        'SELECT * FROM users WHERE email=:email AND password_hash=:hash',
        {
          ':email': req.body.email,
          ':hash': req.body.hash
        }
      );
    } else if (req.body.access_code) {
      query = req.db.get(
        'SELECT * FROM users WHERE access_code=:access_code',
        { ':access_code': req.body.access_code }
      );
    }

    const session = {
      token: hat(),
      expiry: new Date().getTime() + expiryDuration
    };

    query
      .then(function(user) {
        if (!user) {
          res.status(401).json({
            error: 'Username or password invalid.'
          });
          return;
        }

        return req.db.run(
          'INSERT INTO sessions(user_id, session_token, expires_at) ' +
          'VALUES(:user_id, :session_token, :expires_at)' +
          'ON CONFLICT(user_id) DO UPDATE SET ' +
          'session_token=:session_token, expires_at=:expires_at ' +
          'WHERE user_id=:user_id',
          {
            ':user_id': user.id,
            ':session_token': session.token,
            ':expires_at': session.expiry
          }
        );
      })
      .then(function(transaction) {
        if (transaction.changes !== 1) {
          res.status(500);
          res.send('');
          return;
        }

        res.cookie('sessionToken', session.token, {
          maxAge: expiryDuration
        });
        res.send('');
      });
  });
};
