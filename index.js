let state = {
  puzzle: 'mr mojo risin',
  goodLetters: [],
  badLetters: [],
};

const setState = (nextState)=>{
  state = { ...state, ...nextState };
  console.log(state);
  render();
};

const alphabet = [ 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

//const alph = 'abcdefghijklmnopqrstuvwxyz'.split('');


const render = ()=>{
  let newPuzzle = '';

  for(let i=0; i<(state.puzzle.length); i++){
    newPuzzle += `<span class="${state.puzzle[i] === ' '? 'space' : ''}">`+
                    state.puzzle[i]+
                  '</span>';
  }

  document.querySelector('.puzzle').innerHTML = newPuzzle;

  let newButtons = '';
  for(let i=0; i<(alphabet.length); i++){
    if( (state.goodLetters.indexOf( alphabet[i] ) === -1) &&
        (state.badLetters.indexOf( alphabet[i] ) === -1 ) ) {
      newButtons += `<button onclick="guessLetter('${alphabet[i]}')">${alphabet[i]}</button>`;
    }
  }
  document.querySelector('.buttons').innerHTML = newButtons;
};

render();

function guessLetter(letter){
  if( state.puzzle.includes(letter) ){
    // good guess
    const newGoodLetters = state.goodLetters.concat(letter);
    setState({
      goodLetters: newGoodLetters,
    });

  } else {
    // bad guess
    const newBadLetters = state.badLetters.concat(letter);
    setState({
      badLetters: newBadLetters,
    });
  }
}

function setNextPuzzle(){
  setState({
    puzzle: document.querySelector('.next-puzzle').value,
  });
  document.querySelector('.next-puzzle').value = '';
}
