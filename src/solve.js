// Solve start

const SDSIZE = 9;

function initCoords(){
  let sdCoords = [];
  let i,j;
  for (i=0; i < SDSIZE; i++){
    for (j=0; j < SDSIZE; j++){
      sdCoords.push([i,j]);
    }
  }
  return sdCoords;
}

function getRowPeers(coord){
  const [i, j] = coord;
  let rowPeers=[];
  for (let c=0; c < SDSIZE; c++){
    if(c !== j){
      rowPeers.push([i,c]);
    }
  }
  return rowPeers;
}

function getColumnPeers(coord){
  const [i, j] = coord;
  let columnPeers=[];
  for (let r=0; r < SDSIZE; r++){
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
  let d = getRowPeers(coord).concat(getColumnPeers(coord)).concat(getSquarePeers(coord));
  let t;
  return d.filter((t={}, a=> !(t[a]=a in t) )); // Removes duplicates
}

function initDomains(sdCoords){
  let domains = {};
  sdCoords.forEach( coord => {
    domains[coord.toString()] = [1,2,3,4,5,6,7,8,9];
  });
  return domains;
}

function isSolved(domains){
  for(let coord in domains){
    if(domains[coord].length !== 1){
      return false;
    }
  }

  return true;
}

function propogate(domains){
  let change = true;

  while (change){
    change = false;

    for (const coord in domains){
      if (domains[coord].length === 1){
        const num = domains[coord][0];
        const peers = getPeers(coord.split(',').map(Number));
        for(let i = 0; i < peers.length; i++){
          const peer = peers[i];
          if( domains[peer.toString()].includes(num) ){
              if(domains[peer.toString()].length === 1){ return false; }
              domains[peer.toString()] = domains[peer.toString()].filter(elem => elem !== num);
              change = true;
          }
        }
      }
    }
  }
  return true;
}

function restrictDomains(domains, puzzle, coords){
  coords.forEach( (coord) => {
    const [i, j] = coord;
    const c = puzzle.charAt((parseInt(i)*9)+parseInt(j));
    if(c !== '.'){ domains[coord.toString()] = [parseInt(c)]; }
  });
  return domains;
}

function backtrack(stack){
   const [coord, num, domain] = stack.pop();
   domain[coord] = domain[coord].filter(elem => elem !== num);
   return domain;
}

// Makes a guess with the smallest domain returns the num guessed with the corresponding coord
function search(domains, coords){
  let minNumSpots = Number.POSITIVE_INFINITY;
  let coordToRestrict = null;

  for (let coord in coords){
    if (minNumSpots > domains[coords[coord]].length && domains[coords[coord]].length>=2) {
      minNumSpots = domains[coords[coord]].length;
      coordToRestrict = coords[coord];
    }

    if (minNumSpots === 2){
      break;
    }
  }

  let num = domains[coordToRestrict][0];
  domains[coordToRestrict] = [num];

  return [coordToRestrict, num];
}

function getPuzzleString(domains){
  let puzzleString = '';
  for(const coord in domains){
    puzzleString = puzzleString.concat(domains[coord].toString());
  }
  return puzzleString;
}

export default function solve(puzzle){
  const coords = initCoords();
  let domains = initDomains(coords);
  restrictDomains(domains, puzzle, coords);
  let stack = [];

  while(true){

    if(propogate(domains)){
      if(isSolved(domains)){
        return getPuzzleString(domains);
      }

      const domainClone = JSON.parse(JSON.stringify(domains));
      let [coordToRestrict, num] = search(domains, coords);
      stack.push([coordToRestrict, num, domainClone]);

    }else{
      if(stack.length === 0){
        console.log('puzzle impossible');
        return;
      }
      domains = backtrack(stack);
    }
  }
}



// Solve end
