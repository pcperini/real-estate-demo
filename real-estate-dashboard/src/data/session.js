import cookies from 'react-cookies';

const initialState = {
  token: null
};

function sessionReducer(state = initialState, action) {
  switch (action.type) {
    case 'session/refresh_token':
      return {
        ...state,
        token: cookies.load('sessionToken')
      };
    default:
      return state;
  }
}

export {
  sessionReducer
};
