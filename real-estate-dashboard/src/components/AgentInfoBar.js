import React from 'react';
import './AgentInfoBar.css';
import ProfilePhoto from './ProfilePhoto';

function AgentInfoBar(props) {
  return (
    <div className="AgentInfoBar">
      <h1>Listing Agent</h1>
      <ProfilePhoto profile_photo_url={props.agent_profile_photo_url} />
      <h2>{props.agent_name}</h2>
      <h3>{props.agent_email}</h3>
      <h3>{props.agent_phone}</h3>
    </div>
  );
}

export default AgentInfoBar;
