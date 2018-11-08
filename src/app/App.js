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
      <div>
        <Navbar></Navbar>
        <div className="main">
        <Route exact path="/" component={Home}/>
        <Route exact path="/dashboard/:groupid/:clusterid" component={Dashboard}/>
        </div>
      </div>
    );
  }
}

export default App;
