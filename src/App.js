import './App.css';
import solve from './solve.js';
import Sudoku from './sudoku.js';
import './sudoku.css'
import {useState} from "react";

function App() {

  return (
    <div className="App">
      <header className="App-header">
        <Sudoku puzzle={puzzle}/>
        <button onClick={handleSolveClick}>Solve!</button>
      </header>
    </div>
  );
}

export default App;
