import React from 'react';
import { withRouter } from 'react-router-dom';
import './ListingHeaderBar.css';
import Button from './Button';
import heartFull from './icons/heart_full.svg';
import heartOpen from './icons/heart_open.svg';
import shareArrow from './icons/share_arrow.svg';
import { favorite, unfavorite } from '../data/api/favorites';
import ShareSheet from './ShareSheet';

function toggleFavorited(id, favorited) {
  return (dispatch) => {
    if (favorited) { unfavorite(id, dispatch); }
    else { favorite(id, dispatch); }
  };
}

function ListingHeaderBar(props) {
  return (
    <div className="ListingHeaderBar">
      <div>
        <h1>{props.address}</h1>
        <h2>{props.city}, {props.state}</h2>
      </div>
      <div className="spacer"/>
      <Button onClick={
        toggleFavorited(props.match.params.id, props.favorited)
      }>
        <img src={props.favorited ? heartFull : heartOpen} />
      </Button>
      <ShareSheet anchor={(
        <Button>
          <img src={shareArrow} />
        </Button>
      )} />
    </div>
  );
}

export default withRouter(ListingHeaderBar);
