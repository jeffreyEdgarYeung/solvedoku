import React, {useState} from 'react';
import './sudoku.css';
import solve from './solve.js';

function replaceAt(string, index, replacement) {
  console.log(string);
  console.log(index);
    return string.substr(0, index) + replacement + string.substr(index + replacement.length);
}

function Cell(props){
  return (
    <input
      type="text"
      defaultValue={props.value !== '.' ? props.value : ''}
      name={props.idx}
      onInput={props.handleCellChange}
    />
  );
}

function Sudoku(props){
  const [board, setBoard] = useState('..89.1.27.......3412.6.7.9..4..739.8....1....5.682..4..9.3.4.1661.......73.1.82..');
  const [solution, setSolution] = useState('.................................................................................');
  const [solved, setSolved] = useState(false);
  const r0 = board.slice(0, 9).split('').map((char, index) =><td><Cell value={char} idx={index} handleCellChange={handleCellChange}/></td>);
  const r1 = board.slice(9, 18).split('').map((char, index) =><td><Cell value={char} idx={9+index} handleCellChange={handleCellChange}/></td>);
  const r2 = board.slice(18, 27).split('').map((char, index) =><td><Cell value={char} idx={18+index} handleCellChange={handleCellChange}/></td>);
  const r3 = board.slice(27, 36).split('').map((char, index) =><td><Cell value={char} idx={27+index} handleCellChange={handleCellChange}/></td>);
  const r4 = board.slice(36, 45).split('').map((char, index) =><td><Cell value={char} idx={36+index} handleCellChange={handleCellChange}/></td>);
  const r5 = board.slice(45, 54).split('').map((char, index) =><td><Cell value={char} idx={45+index} handleCellChange={handleCellChange}/></td>);
  const r6 = board.slice(54, 63).split('').map((char, index) =><td><Cell value={char} idx={54+index} handleCellChange={handleCellChange}/></td>);
  const r7 = board.slice(63, 72).split('').map((char, index) =><td><Cell value={char} idx={63+index} handleCellChange={handleCellChange}/></td>);
  const r8 = board.slice(72).split('').map((char, index) =><td><Cell value={char} idx={72+index} handleCellChange={handleCellChange}/></td>);


  function handleCellChange(e){
    if( (String(+e.target.value).charAt(0) === e.target.value|| e.target.value === '') && e.target.value !== '0'){
      const boardCpy = board.slice(0);
      let val = e.target.value;
      if(e.target.value === ''){
        val = '.';
      }
      const newBoard = replaceAt(boardCpy, parseInt(e.target.name), val)
      console.log(newBoard);
      setBoard(newBoard)
    }
  }

  function handleSolveClick(){
    const solution = solve(board);
    console.log(solution);
    setSolution(solution);
    setSolved(true);
    console.log(solution.slice(0, 9).split(''));
  }
  if(solved){

    let s0 = solution.slice(0, 9).split('').map((char, index) =><td><Cell value={char} idx={index} handleCellChange={handleCellChange}/></td>);;
    const s1 = solution.slice(9, 18).split('').map((char, index) =><td><Cell value={char} idx={9+index} handleCellChange={handleCellChange}/></td>);
    const s2 = solution.slice(18, 27).split('').map((char, index) =><td><Cell value={char} idx={18+index} handleCellChange={handleCellChange}/></td>);
    const s3 = solution.slice(27, 36).split('').map((char, index) =><td><Cell value={char} idx={27+index} handleCellChange={handleCellChange}/></td>);
    const s4 = solution.slice(36, 45).split('').map((char, index) =><td><Cell value={char} idx={36+index} handleCellChange={handleCellChange}/></td>);
    const s5 = solution.slice(45, 54).split('').map((char, index) =><td><Cell value={char} idx={45+index} handleCellChange={handleCellChange}/></td>);
    const s6 = solution.slice(54, 63).split('').map((char, index) =><td><Cell value={char} idx={54+index} handleCellChange={handleCellChange}/></td>);
    const s7 = solution.slice(63, 72).split('').map((char, index) =><td><Cell value={char} idx={63+index} handleCellChange={handleCellChange}/></td>);
    const s8 = solution.slice(72).split('').map((char, index) =><td><Cell value={char} idx={72+index} handleCellChange={handleCellChange}/></td>);

    return(
      <>
      <table>
      <caption>Solved!</caption>

       <tbody>
        <tr>{s0}</tr>
        <tr>{s1}</tr>
        <tr>{s2}</tr>
       </tbody>
       <tbody>
        <tr>{s3}</tr>
        <tr>{s4}</tr>
        <tr>{s5}</tr>
       </tbody>

       <tbody>
        <tr>{s6}</tr>
        <tr>{s7}</tr>
        <tr>{s8}</tr>
       </tbody>
       </table>
      <button onClick={handleSolveClick}>Solve!</button>
      </>
    );
  }else{
    return(
      <>
      <table>
        <caption>Solvedoku</caption>
        <colgroup><col/><col/><col/></colgroup>
        <colgroup><col/><col/><col/></colgroup>
        <colgroup><col/><col/><col/></colgroup>
        <tbody>
         <tr>{r0}</tr>
         <tr>{r1}</tr>
         <tr>{r2}</tr>
        </tbody>
        <tbody>
         <tr>{r3}</tr>
         <tr>{r4}</tr>
         <tr>{r5}</tr>
        </tbody>
        <tbody>
         <tr>{r6}</tr>
         <tr>{r7}</tr>
         <tr>{r8}</tr>
        </tbody>

     </table>
      <button onClick={handleSolveClick}>Solve!</button>
      </>
    );
  }

}

export default Sudoku;
