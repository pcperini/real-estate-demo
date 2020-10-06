import React from 'react';
import { connect } from 'react-redux';

function Button(props) {
  return (
    <div className="Button" onClick={props.onClick}>
      {props.children}
    </div>
  );
}

export default connect(
  null,
  (dispatch, ownProps) => {
    const onClick = ownProps.onClick || (() => {});
    return { onClick: () => onClick(dispatch) };
  }
)(Button);
