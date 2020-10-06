import { post } from './api';
import sha256 from 'js-sha256';

function login(email, password, dispatch) {
  // Unsalted SHA256 is insufficiently secure.
  // Replace with bcrypt or service like Auth0.
  const hash = sha256(password);

  post('/login', { email, hash })
    .then((res) => {
      dispatch({ type: 'session/refresh_token' });
    });
}

function access(access_code, dispatch) {
  post('/login', { access_code })
    .then((res) => {
      dispatch({ type: 'session/refresh_token' });
    });
}

export {
  login,
  access
};
