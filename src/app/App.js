import React, { Component } from 'react';
import './App.css';

//router
import { Route, Switch, withRouter } from 'react-router-dom';

//navbar
import Navbar from './navbar/Navbar';

//pages
import Home from './home/Home.js';
import Login from './login/Login.js';
import Dashboard from './dashboard/Dashboard.js';

//global cookies
import { withCookies, Cookies } from 'react-cookie';


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sideToggle: false
    }
  }

  render() {
    return (
      <div>
        <Navbar sideToggle={this.state.sideToggle} />
        <div className="main">
          <div className="panel">
            <Switch>
              <Route exact path="/" render={() => (<Home cookies={this.props.cookies} />)} />
              <Route exact path="/login" render={() => (<Login cookies={this.props.cookies} />)} />
              <Route exact path="/dashboard" component={(props) => (<Dashboard cookies={this.props.cookies} match={props.match} />)} />
              <Route exact path="/dashboard/:group_id" render={(props) => (<Dashboard cookies={this.props.cookies} match={props.match} />)} />
              <Route exact path="/dashboard/:group_id/:cluster_id" render={(props) => (<Dashboard cookies={this.props.cookies} match={props.match} />)} />
            </Switch>
          </div>
        </div>
      </div>
    );
  }
}

export default withCookies(App);
