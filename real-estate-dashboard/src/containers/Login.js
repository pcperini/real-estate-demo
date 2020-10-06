import React from 'react';
import { connect } from 'react-redux';
import { update } from '../data/store';
import { login } from '../data/api/login';
import './Login.css';

function handleLogin(dispatch) {
  return (email, password) => {
    return (event) => {
      event.preventDefault();
      login(email, password, dispatch);
    };
  };
}

function Login(props) {
  return (
    <div className="Login">
      <form onSubmit={props.handleLogin(props.email, props.password)}>
        <label htmlFor="email">Email</label>
        <br/>
        <input type="text" name="email" onChange={props.updateEmail} />
        <br/><br/>
        <label htmlFor="password">Password</label>
        <br/>
        <input type="password" name="password" onChange={props.updatePassword}/>
        <br/><br/>
        <input type="submit" value="Login" />
      </form>
    </div>
  );
}

export default connect(
  (state) => ({
    email: state.login.email,
    password: state.login.password
  }),
  (dispatch) => ({
    updateEmail: (e) => update('login/form/set_email')(dispatch, e),
    updatePassword: (e) => update('login/form/set_password')(dispatch, e),
    handleLogin: (email, pw) => handleLogin(dispatch)(email, pw)
  })
)(Login);
