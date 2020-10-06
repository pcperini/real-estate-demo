import React from 'react';
import './HeaderBar.css';
import logo from './logo.png';
import ProfilePhoto from './ProfilePhoto';
import { Link } from 'react-router-dom';

function HeaderBar(props) {
  return (
    <div className="HeaderBar">
      <Link to="/">
        <div className="Logo" style={{
          backgroundImage: `url('${logo}')`
        }}/>
      </Link>
    </div>
  );
}

export default HeaderBar;
