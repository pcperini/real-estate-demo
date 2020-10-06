import React from 'react';
import { Link } from 'react-router-dom';
import './ListingEntry.css';
import Badge from './Badge';
import { comma } from '../util/str';

function ListingEntry(props) {
  const tags = [];
  if (props.favorited) {
    tags.push({text: '❤️', color: 'red'});
  }

  return (
    <Link to={`/listings/${props.id}`}>
      <div className="ListingEntry" id={`Listing${props.id}`}>
        <div className="ListingContent">
          <div className="ListingImage" style={{
            backgroundImage: `url('${props.photo_url}')`
          }}>
            <div className="BadgeBar">
              {tags.map((tag, idx) => (
                <Badge color={tag.color} key={idx}>{tag.text}</Badge>
              ))}
            </div>
          </div>

          <div className="ListingInfo">
            <h2>{props.address}</h2>
            <div className="Price">${comma(props.price_dollars)}</div>
            <div className="RoomInfo">
              {props.bed_count} bed, {props.bath_count} bath
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default ListingEntry;
