import { get } from './api';

function getListings(dispatch) {
  get('/listings')
    .then((resp) => resp.json())
    .then((listings) => {
      dispatch({ type: 'listings/set_listings', value: listings });
    });
}

function getListing(id, dispatch) {
  get(`/listings/${id}`)
    .then((resp) => resp.json())
    .then((listing) => {
      dispatch({ type: 'listings/set_listing', id, value: listing });
    });
}

export {
  getListings,
  getListing
};
