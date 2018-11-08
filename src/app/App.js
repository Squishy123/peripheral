import React, { Component } from 'react';
import './App.css';

//navbar
import Navbar from './navbar/Navbar';

class App extends Component {
  render() {
    return (
      <div>
        <Navbar></Navbar>
        <h1>Hello World!</h1>
      </div>
    );
  }
}

export default App;
