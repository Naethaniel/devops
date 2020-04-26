import React from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

function App() {
  const handleClick = async () => {
    axios.get('/api/').then(res => console.log(res));
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <button onClick={() => handleClick()}>
          Pobierz z API
        </button>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
