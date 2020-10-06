import React from 'react';
import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Login from './containers/Login';
import Listings from './containers/Listings';
import Listing from './containers/Listing';
import HeaderBar from './components/HeaderBar';
import { access } from './data/api/login';
import queryString from 'query-string';

class App extends React.Component {
  componentDidMount() {
    this.props.refreshSessionToken()
  }

  componentDidUpdate() {
    this.props.refreshSessionToken()
  }

  render() {
    return (
      <div className="App">
        <Router>
          <HeaderBar/>
          <AccessCapture
            sessionToken={this.props.sessionToken}
            access={this.props.access}
          />
          <AuthRedirect sessionToken={this.props.sessionToken} pre={true}/>
          <Switch>
            <Route path="/login">
              <AuthRedirect sessionToken={this.props.sessionToken} pre={false}/>
              <Login/>
            </Route>
            <Route path="/listings/:id">
              <Listing/>
            </Route>
            <Route path="/">
              <Listings/>
            </Route>
          </Switch>
        </Router>
      </div>
    );
  }
}

const AuthRedirect = withRouter((props) => {
  const q = queryString.parse(props.location.search);
  if (q.c) {
    return null
  } else if (props.pre && props.sessionToken === undefined) {
    return <Redirect to="/login"/>;
  } else if (!props.pre && props.sessionToken !== undefined) {
    return <Redirect to="/"/>;
  }

  return null;
});

const AccessCapture = withRouter((props) => {
  if (props.sessionToken !== undefined) { return null; }
  const q = queryString.parse(props.location.search);
  if (q.c) { props.access(q.c); }
  return null;
});

export default connect(
  (state) => ({
    sessionToken: state.session.token
  }),
  (dispatch) => ({
    refreshSessionToken: () => dispatch({ type: 'session/refresh_token' }),
    access: (code) => access(code, dispatch)
  })
)(App);
