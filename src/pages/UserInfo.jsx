import { Auth } from 'aws-amplify';
import React, { useContext } from 'react';
import UserContext from '../components/Auth/UserContext';
import '../styles/UserInfo.scss';

function UserInfo() {
  const userContext = useContext(UserContext);

  const { user } = userContext;

  return (
    <div className="user-info">
      <div className="user-info-body">
        <div className="user-info_heading">
          <div className="user-info_heading_label">
            User
          </div>
          <div className="user-info_heading_username-value">
            {user.username}
          </div>
        </div>
        {/* <div className="user-info_item">
          <div className="user-info_item_label">
          </div>
          <div className="user-info_item_value">
          </div> */}
      </div>
    </div>
  );
}

export default UserInfo;
