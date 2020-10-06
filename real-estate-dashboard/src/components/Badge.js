import React from 'react';
import './Badge.css';
import chroma from 'chroma-js';

function Badge(props) {
  return (
    <div className="Badge" style={{
      backgroundColor: chroma(props.color).alpha(0.1).hex()
    }}>
      <span style={{
        color: props.color
      }}>
        {props.children}
      </span>
    </div>
  );
}

export default Badge;
