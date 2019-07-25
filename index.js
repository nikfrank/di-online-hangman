let state = {
  puzzle: 'mr mojo risin',
  goodLetters: [],
  badLetters: [],
  gameStatus: 'playing',
};

const setState = (nextState)=>{
  state = { ...state, ...nextState };
  render();
};

const alphabet = [ 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

//const alph = 'abcdefghijklmnopqrstuvwxyz'.split('');


const render = ()=>{
  const gallow = document.querySelector('.gallow');
  gallow.className = gallow.className.replace(/mistakes-\d/, '');
  gallow.classList.add('mistakes-'+(state.badLetters.length));

  let newPuzzleHTML = '';

  for(let i=0; i<(state.puzzle.length); i++){
    let letterToRender = '';
    if( state.goodLetters.indexOf(state.puzzle[i]) !== -1 ){
      letterToRender = state.puzzle[i];
    }

    newPuzzleHTML += `<span class="${state.puzzle[i] === ' '? 'space' : ''}">`+
                        letterToRender+
                     '</span>';
  }

  document.querySelector('.puzzle').innerHTML = newPuzzleHTML;


  let newBadLettersHTML = '';

  for( let i=0; i<(state.badLetters.length); i++){
    newBadLettersHTML += `<span class='bad-letter'>${state.badLetters[i]}</span>`;
  }

  document.querySelector('.bad-letters').innerHTML = newBadLettersHTML;


  let newButtonsHTML = '';
  for(let i=0; i<(alphabet.length); i++){
    if( (state.goodLetters.indexOf( alphabet[i] ) === -1) &&
        (state.badLetters.indexOf( alphabet[i] ) === -1 ) ) {
      newButtonsHTML += `<button onclick="guessLetter('${alphabet[i]}')">${alphabet[i]}</button>`;
    }
  }
  document.querySelector('.buttons').innerHTML = newButtonsHTML;

  if( state.gameStatus === 'over' ){
    document.querySelector('.game-status-message').innerHTML =
      '<div class="lose-message">YOU LOSE YOU LOSER</div>';

  } else if( state.gameStatus === 'playing' ) {
    document.querySelector('.game-status-message').innerHTML = '';

  } else if( state.gameStatus === 'winning' ) {
    document.querySelector('.game-status-message').innerHTML =
      '<div class="win-message">WINNER WINNER CHICKEN DINNER</div>';
  }
};

render();

function guessLetter(letter){
  if( state.gameStatus === 'playing' ) {

    if( state.puzzle.includes(letter) ){
      // good guess
      const newGoodLetters = state.goodLetters.concat(letter);
      setState({
        goodLetters: newGoodLetters,
      });

      // figure out if they are winning
      let lettersRemaining = state.puzzle.replace(/\s/g, '');
      for(let i=0; i<(state.goodLetters.length); i++){
        lettersRemaining =
          lettersRemaining.replace(new RegExp(state.goodLetters[i], 'g'), '');
      }
      if( !lettersRemaining ){
        setState({
          gameStatus: 'winning'
        });
      }

    } else {
      // bad guess
      const newBadLetters = state.badLetters.concat(letter);
      setState({
        badLetters: newBadLetters,
      });
      if( state.badLetters.length >= 6 ) {
        setState({
          gameStatus: 'over',
        });
      }
    }
  }
}

function setNextPuzzle(){
  setState({
    puzzle: document.querySelector('.next-puzzle').value,
    goodLetters: [],
    badLetters: [],
    gameStatus: 'playing',
  });
  document.querySelector('.next-puzzle').value = '';
}
