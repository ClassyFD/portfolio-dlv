import React, { Component } from 'react';
import './styles/index.css';
import Nav from './containers/Nav';
import Home from './containers/Home';
import About from './containers/About';
import Skills from './containers/Skills';
import Projects from './containers/Projects';
import Contact from './containers/Contact';
import { Switch, Route } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Nav/>
        <main className="app-main-container">
          <div className="app-animation-bg"/>
          <Switch>
            <Route exact path="/" component={Home}/>
            <Route path="/about" component={About}/>
            <Route path="/skills" component={Skills}/>
            <Route path="/projects" component={Projects}/>
            <Route path="/contact" component={Contact}/>
          </Switch>
        </main>
      </div>
    );
  }
}

export default App;
