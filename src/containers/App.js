import React, { Component } from 'react';
import '../styles/index.css';
import Nav from './Nav';
import { Switch, Link } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <main className="App">
        <Nav/>
        <Switch>
          
        </Switch>
      </main>
    );
  }
}

export default App;
