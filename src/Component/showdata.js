import React, { useState, useEffect } from 'react';
const UserList = () => {
    const [userData, setUserData] = useState([]);
    useEffect(() => {
      // Gọi API 
      fetch('https://us-east-1.aws.data.mongodb-api.com/app/application-0-sznak/endpoint/getUsers')
        .then(response => response.json())
        .then(data => {
          // Cập nhật state với dữ liệu người dùng
          setUserData(data);
        })
        .catch(error => console.error('Error:', error));
    }, []); // [] đảm bảo useEffect chỉ gọi một lần khi component được mount
  
    return (
      <div>
        <h1>User Data</h1>
        {userData.length === 0 ? (
          <p>No user data available</p>
        ) : (
          <div>
            {userData.map(user => (
              <div key={user.id}>
                <p><strong>Username:</strong> {user.username}</p>
                <p><strong>Password:</strong> {user.password}</p> 
                <p>-----------</p>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
export default UserList;
