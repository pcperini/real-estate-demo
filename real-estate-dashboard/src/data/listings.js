const initialState = {
  listings: [],
  filters: {
    favorites: false
  }
};

function listingsReducer(state = initialState, action) {
  switch (action.type) {
    // listings
    case 'listings/set_listings':
      return { ...state, listings: action.value };
    case 'listings/set_listing': {
      const idx = state.listings.findIndex((l) => l.id == action.id);
      if (idx === -1) {
        state.listings.push(action.value);
      } else {
        state.listings[idx] = action.value;
      }
      return { ...state };
    }

    // listings/listing
    case 'listings/listing/set_favorited': {
      const idx = state.listings.findIndex((l) => l.id == action.id);
      if (idx === -1) { return state; }
      state.listings[idx].favorited = true;
      return { ...state };
    }
    case 'listings/listing/set_unfavorited': {
      const idx = state.listings.findIndex((l) => l.id == action.id);
      if (idx === -1) { return state; }
      state.listings[idx].favorited = false;
      return { ...state };
    }

    // listings/filters
    case 'listings/filters/toggle_favorites':
      state.filters.favorites = !state.filters.favorites
      return { ...state };
    default:
      return state;
  }
}

function filteredListings(state) {
  if (!state.listings.listings.length) { return []; }
  return state.listings.listings
    .filter((l) => !state.listings.filters.favorites || l.favorited)
}

export {
  listingsReducer,
  filteredListings
};
