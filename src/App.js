import logo from './logo.svg';
import './App.css';

function App() {


  var sdSize = 9;

  function initCoords(){
    let sdCoords = [];
    let i,j;
    for (i=0; i < sdSize; i++){
      for (j=0; j < sdSize; j++){
        sdCoords.push([i,j]);
      }
    }
    return sdCoords;
  }

  function getRowPeers(coord){
    const [i, j] = coord;
    let rowPeers=[];
    for (let c=0; c < sdSize; c++){
      if(c !== j){
        rowPeers.push([i,c]);
      }
    }
    return rowPeers;
  }

  function getColumnPeers(coord){
    const [i, j] = coord;
    let columnPeers=[];
    for (let r=0; r < sdSize; r++){
      if(r !== i){
        columnPeers.push([r,j]);
      }
    }
    return columnPeers;
  }

  function getSquarePeers(coord){
    const [i, j] = coord;
    let squarePeers = [];
    const upperLeftI = Math.floor(i/3)*3;
    const upperLeftj = Math.floor(j/3)*3;

    for (let sr = 0; sr < 3; sr++){
      for (let sc = 0; sc <3; sc++){
        let squarePeer = [sr + upperLeftI, sc +upperLeftj];
        if (JSON.stringify(squarePeer) !== JSON.stringify(coord)){
          squarePeers.push(squarePeer);
        }
      }
    }
    return squarePeers;
  }

  function getPeers(coord){
    return getRowPeers(coord).concat(getColumnPeers(coord)).concat(getSquarePeers(coord));
  }

  function initDomains(sdCoords){
    let domains = {};
    sdCoords.forEach( coord => {
      domains[coord] = [1,2,3,4,5,6,7,8,9];
    });
    return domains;
  }

  function propogate(domains){
    let change = true;

    while (change){
      change = false;
      for(let coord in domains){
        const [i, j] = coord.split(',');
        if (domains[coord].length === 1){

          let num = domains[coord][0];
          const peers = getPeers([parseInt(i), parseInt(j)])

          peers.forEach( peer => {
            console.log(peer);
            if(domains[peer].includes(num)){
              domains[peer] = domains[peer].filter(elem => elem !== num);
              change = true;
            }
          });
        }
      }
    }
    return domains;
  }

  function restrictDomains(domains, puzzle){
    var copy = {...domains};
    for(let coord in sdCoords){

      const [i, j] = sdCoords[coord];
      const c = puzzle.charAt((parseInt(i)*9)+parseInt(j));
      if(c !== '.'){

        domains[sdCoords[coord]] = [parseInt(c)];
      }
    }
    return domains;
  }

  const puzzle = '..89.1.27.......3412.6.7.9..4..739.8....1....5.682..4..9.3.4.1661.......73.1.82..';
  var sdCoords = initCoords();

  let domains = initDomains(sdCoords);
  domains = restrictDomains(domains, puzzle);
  console.log(domains);
  domains = propogate(domains);
  console.log(domains);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
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
