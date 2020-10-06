const initialState = {
  email: null
};

function shareReducer(state = initialState, action) {
  switch (action.type) {
    case 'share/form/set_email':
      return { ...state, email: action.value };
    default:
      return state;
  }
}

export {
  shareReducer
};
