import React, { useState, useEffect } from 'react';
import './ListUser.css';

const UserList = () => {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    fetch('https://us-east-1.aws.data.mongodb-api.com/app/application-0-sznak/endpoint/getUsers')
      .then(response => response.json())
      .then(data => {
        setUserData(data);
      })
      .catch(error => console.error('Error:', error));
  }, []);

  return (
    <div className="user-list-container">
      <h2 className="user-list-header">User Data</h2>
      <hr />

      {userData.length === 0 ? (
        <p>No user data available</p>
      ) : (
        <div>
          {userData.map((user, index) => (
            <div key={index} className="user-list-item">
              <p><strong>Username:</strong> {user.username}</p>
              <p><strong>Password:</strong> {user.password}</p>
              <hr />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserList;
