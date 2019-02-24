import React, { Component } from 'react';
import './App.css';
import AttendeeList from './AttendeeList';
import Form from './Form';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h2>MageTestFest Attendees</h2>
        <Form />
        <AttendeeList />
      </div>
    );
  }
}

export default App;
