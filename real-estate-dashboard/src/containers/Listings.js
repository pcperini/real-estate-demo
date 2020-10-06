import React from 'react';
import { connect } from 'react-redux';
import './Listings.css';
import FilterBar from '../components/FilterBar';
import Grid from '../components/Grid';
import ListingEntry from '../components/ListingEntry';
import { getListings } from '../data/api/listings';
import { filteredListings } from '../data/listings';

function fetchListings(dispatch) {
  return () => {
    getListings(dispatch);
  };
}

class Listings extends React.Component {
  componentDidMount() {
    this.props.fetchData();
  }

  render() {
    return (
      <div className="Listings">
        <FilterBar />
        <Grid
          items={this.props.listings}
          fetchData={this.props.fetchData}
          hasMore={() => false}
          renderer={(item, idx) => <ListingEntry {...item} key={idx}/>}
        />
      </div>
    );
  }
}

export default connect(
  (state) => ({
    listings: filteredListings(state)
  }),
  (dispatch) => ({
    fetchData: fetchListings(dispatch)
  })
)(Listings);
