import React from 'react';
import './ProfilePhoto.css';

function ProfilePhoto(props) {
  return (
    <div className="ProfilePhoto" style={{
      backgroundImage: `url('${props.profile_photo_url}')`
    }} />
  );
}

export default ProfilePhoto;
