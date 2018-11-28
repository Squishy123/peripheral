import React, { Component } from 'react';
import './App.css';

//router
import {Route, Switch, withRouter} from 'react-router-dom';

//navbar
import Navbar from './navbar/Navbar';

//pages
import Home from './home/Home.js';
import Dashboard from './dashboard/Dashboard.js';


class App extends Component {
  render() {
    return (
      <div className="main">
        <Navbar></Navbar>
        <div className="panel">
        <Route exact path="/" component={Home}/>
        <Route exact path="/dashboard/:group_id" component={Dashboard}/>
        <Route exact path="/dashboard/:group_id/:cluster_id" component={Dashboard}/>
        </div>
      </div>
    );
  }
}

export default App;
