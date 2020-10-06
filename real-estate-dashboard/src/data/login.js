const initialState = {
  email: null,
  password: null
};

function loginReducer(state = initialState, action) {
  switch (action.type) {
    case 'login/form/set_email':
      return { ...state, email: action.value };
    case 'login/form/set_password':
      return { ...state, password: action.value };
    default:
      return state;
  }
}

export {
  loginReducer
};
