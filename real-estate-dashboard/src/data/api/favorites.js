const { put, del } = require('./api');

function favorite(listingId, dispatch) {
  put(`/favorites/${listingId}`)
    .then((listings) => {
      dispatch({ type: 'listings/listing/set_favorited', id: listingId });
    });
}

function unfavorite(listingId, dispatch) {
  del(`/favorites/${listingId}`)
    .then((listings) => {
      dispatch({ type: 'listings/listing/set_unfavorited', id: listingId });
    });
}

export {
  favorite,
  unfavorite
};
