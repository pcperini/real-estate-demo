import React from 'react';
import Popover from 'react-popover';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { update } from '../data/store';
import { copyShareLink } from '../data/api/share';
import './ShareSheet.css';

function handleSubmit(dispatch) {
  return (email, id) => {
    return (event) => {
      event.preventDefault();
      copyShareLink(id, email);
    };
  };
}

class ShareSheet extends React.Component {
  state = { isOpen: false }

  toggle(toState=null) {
    this.setState({ isOpen: toState === null ? !this.state.isOpen : toState })
  }

  render() {
    const anchor = React.cloneElement(this.props.anchor, {
      onClick: () => this.toggle(!this.state.isOpen)
    });

    return (
      <Popover
        isOpen={this.state.isOpen}
        body={this.renderForm()}
      >
        {anchor}
      </Popover>
    );
  }

  renderForm() {
    return (
      <div>
        <h1>Share</h1>
        <form onSubmit={this.props.handleSubmit(this.props.email)}>
          <label htmlFor="email">Recipient's Email</label>
          <br/>
          <input type="text" name="email" onChange={this.props.updateEmail}/>
          <br/>
          <input type="submit" value="Copy Invitation Link"/>
        </form>
      </div>
    );
  }
}

export default withRouter(connect(
  (state) => ({
    email: state.share.email
  }),
  (dispatch, ownProps) => ({
    updateEmail: (e) => update('share/form/set_email')(dispatch, e),
    handleSubmit: (email) => (
      handleSubmit(dispatch)(email, ownProps.match.params.id)
    )
  })
)(ShareSheet));
