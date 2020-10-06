import React from 'react';
import './ListingMain.css';
import { comma } from '../util/str';

function ListingMain(props) {
  if (!props.photo_url) { return null; }

  return (
    <div className="ListingMain">
      <div className="ListingImage" style={{
        backgroundImage: `url('${props.photo_url}')`
      }} />

      <div className="ListingDetails">
        <h1 className="Price">${comma(props.price_dollars)}</h1>
        <div>
          <h3>{props.bed_count} Bed, {props.bath_count} Bath &bull;</h3>
          <h3>&nbsp;{props.square_footage} sq ft</h3>
        </div>
        <div>
          {(props.description || '').split("\n").map((i, key) => {
              return <p key={key}>{i}</p>;
          })}
        </div>
      </div>
    </div>
  );
}

export default ListingMain;
