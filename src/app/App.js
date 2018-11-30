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


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sideToggle: false
    }
  }

  render() {
    return (
      <div className="main">
        <Navbar sideToggle={this.state.sideToggle} />
        <div className="panel">
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/dashboard/:group_id" component={Dashboard} />
          <Route exact path="/dashboard/:group_id/:cluster_id" component={Dashboard} />
        </div>
      </div>
    );
  }
}

export default App;
