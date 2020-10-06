import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import './Listing.css';
import { getListing } from '../data/api/listings';
import ListingHeaderBar from '../components/ListingHeaderBar';
import ListingMain from '../components/ListingMain';
import AgentInfoBar from '../components/AgentInfoBar';

function fetchListing(id, dispatch) {
  return () => {
    getListing(id, dispatch);
  };
}

class Listing extends React.Component {
  componentDidMount() {
    this.props.fetchData();
  }

  render() {
    return (
      <div className="Listing">
        <ListingHeaderBar {...this.props} />
        <div className="Body">
          <ListingMain {...this.props} />
          <AgentInfoBar {...this.props} />
        </div>
      </div>
    );
  }
}

export default withRouter(connect(
  (state, ownProps) => {
    const { id } = ownProps.match.params;
    return { ...state.listings.listings.find((l) => l.id == id) };
  },
  (dispatch, ownProps) => {
    const { id } = ownProps.match.params;
    return { fetchData: fetchListing(id, dispatch) };
  }
)(Listing));
