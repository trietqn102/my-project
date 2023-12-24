import React from 'react';
import Nav from './Nav';
import {  Routes, Route } from "react-router-dom";
import UserList from './ListUser';
import MyComponent from './Logdata';
import Home from './Home';
import UserLogin from './SiginForm';
import Filldata from './showdata';

const fetchData = async () => {
  const response = await fetch('https://us-east-1.aws.data.mongodb-api.com/app/application-0-sznak/endpoint/getUsers');
  const data = await response.json();
  const jsonArray = Array.isArray(data) ? data : [data];
  return jsonArray;
};

function checkDbUser(jsonArray, value1, value2) {
  for (const obj of jsonArray) {
    if (obj.username === value1 && obj.password === value2) {
      return true;
    }
  }
  return false;
}

class MyComponent1 extends React.Component {
  state = {
    username: '',
    password: '',
    checklogin: '',
  };

  handleLogin = async (event) => {
    event.preventDefault(); 
    const DataUser = await fetchData();
    const checklogin = checkDbUser(DataUser, this.state.username, this.state.password);
    this.setState({ checklogin }); // Cập nhật trạng thái sử dụng setState
  };

  handleChangeUsername = (event) => {
    this.setState({ username: event.target.value });
  };

  handleChangePassword = (event) => {
    this.setState({ password: event.target.value });
  };

  handleLogout = async (event) => {
    event.preventDefault();
    this.setState({ checklogin:event.target.value });
  };

  render() {
    const { checklogin } = this.state; // Đảm bảo sử dụng trạng thái từ state
    return (
      <>
        {!checklogin && (
          <form>
            <div>
              <label htmlFor="LoginUser">Login User</label>
            </div>
            <div>
              <label>Username: </label>
              <input
                type="text"
                title="Username"
                value={this.state.username}
                onChange={this.handleChangeUsername}
              />
            </div>
            <div>
              <label>Password: </label>
              <input
                type="password"
                title="Password"
                value={this.state.password}
                onChange={this.handleChangePassword}
              />
            </div>
            <br />
            <div>
              <button onClick={this.handleLogin}>LogIn</button>
            </div>
          </form>
        )}
       {checklogin && (
          <div>
            <div><Nav /></div>
            <Routes>
              <Route path="/my-project" element={<Home />} />
              <Route path="/my-project/Control" element={<><MyComponent/><Filldata /> </>}/>
              <Route path="/my-project/Sign-In" element={<> <UserLogin /> <UserList /></>} />
            </Routes>
            <div>
              <button onClick={this.handleLogout}>LogOut</button>
            </div>
          </div>
        )}
      </>
    );
  }
}

export default MyComponent1;