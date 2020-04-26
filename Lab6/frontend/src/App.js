import React, {useState} from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [height, setHeight] = useState('');
  const [radius, setRadius] = useState('');
  const [volume, setVolume] = useState('');
  const [results, setResults] = useState([]);

  const handleVolume = async (e) => {
    e.preventDefault();
    axios.post('/api/cone-volume', {height, radius}).then(res => setVolume(Math.round(res.data.volume)));
  };

  const handleResults = async (e) => {
    e.preventDefault();
    axios.get('/api/results').then(res => setResults(res.data.volumes));
  };

  const renderResults = () => {
    const elems = results.map(res => {
      return <li key={res.volume}>Height: {res.height} | Radius: {res.radius} | Volume: {res.volume}</li>
    });
    return (
      <ul>{elems}</ul>
    )
  }

  return (
    <div className="App">
      <header className="App-header">
        <form>
          <label>Height</label>
          <input type="number" value={height} onChange={e => setHeight(e.target.value)}/>
          <br/>
          <label>Radius</label>
          <input type="number" value={radius} onChange={e => setRadius(e.target.value)}/>
          <br/>
          <button onClick={(e) => handleVolume(e)}>
            Calculate volume!
          </button>
        </form>
        {volume && <p>Your cone volume is {volume}</p>}
        <button onClick={(e) => handleResults(e)}>Get all results</button>
        {results && renderResults()}
      </header>
    </div>
  );
}

export default App;
