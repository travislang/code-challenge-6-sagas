import React, { Component } from 'react';
import AnimalList from '../AnimalList/AnimalList'
import './App.css';
import NewAnimal from '../NewAnimal/NewAnimal';

class App extends Component {
  // Renders the entire app on the DOM
  render() {
    return (
      <div className="App">
        <header>
          <h1>Zoo Animals</h1>
          <h3>List of Species and Class</h3>
        </header>
        <br />
        <br />
        <NewAnimal />
        <AnimalList />
      </div>
    );
  }
}

export default App;
