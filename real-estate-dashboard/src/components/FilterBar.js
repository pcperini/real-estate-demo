import React from 'react';
import './FilterBar.css';
import { connect } from 'react-redux';

function FilterBar(props) {
  return (
    <div className="FilterBar">
      <input type="checkbox" name="favorites" onClick={props.toggleFavorites}/>
      <label htmlFor="favorites">Filter to Favorites</label>
    </div>
  );
}

export default connect(
  (state) => ({
    favorites: state.listings.filters.favorites
  }),
  (dispatch) => ({
    toggleFavorites: () => dispatch({
      type: 'listings/filters/toggle_favorites'
    })
  })
)(FilterBar);
