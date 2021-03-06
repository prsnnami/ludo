import initRows, {checkSafe} from './action_board';
import initTokens, { move, getTokenPos, validMove } from './action_token';
import initTurn from './action_turn';

//constants
// export const INITIALIZED_SQUARES = 'INITIALIZED_SQUARES'; 
export const INITIALIZED_ROWS = 'INITIALIZED_ROWS'; 
export const INITIALIZED_TOKENS = 'INITIALIZED_TOKENS';
export const INITIALIZED_TURN = 'INITIALIZED_TURN';
export const DICE_ROLL = 'DICE_ROLL';
export const TURN_START = 'TURN_START';
export const VALID_TOKENS = 'VALID_TOKENS';
export const NEXT_TURN = 'NEXT_TURN';
export const TOKEN_MOVED = 'TOKEN_MOVED';
export const ACTIVATED_TOKEN = 'ACTIVATED_TOKEN';
export const END_TURN = 'END_TURN';
export const SAFE_STATE = 'SAFE_STATE';
export const KILLING_TOKENS  = 'KILLING_TOKENS';
// export const TOKEN_SET_POS = 'TOKEN_SET_POS';
// export const TOKEN_COMPLETE = 'TOKEN_COMPLETE';
// export const CHANGE_TURN = 'CHANGE_TURN';
// export const CHANGE_VAL = 'CHANGE_VAL';
// export const PLAYER_CHANGED = 'PLAYER_CHANGED';
//Action Creators

export function initGame() {
  let rows = initRows();
  let turn = initTurn();
  let tokens = initTokens();
  return dispatch => {
    dispatch({
      type: INITIALIZED_ROWS,
      rows
    });
    dispatch({
      type: INITIALIZED_TOKENS,
      tokens
    });
    dispatch({
      type: INITIALIZED_TURN,
      turn
    });
  }
} 

function rollDice() {
  let rollValue = Math.ceil(Math.random() * 6);
  return {
    type: DICE_ROLL,
    rollValue
  }
}

function validTokens(turn, tokens) {
  let valid_tokens = tokens;
  if(turn.value !== 1) {
    valid_tokens = valid_tokens
                    .filter( t => t.active )
                    .filter( t => validMove(t, turn.value) );
  }
  return valid_tokens;
}

export function startTurn(getState) {
  return (dispatch, getState) => {
    dispatch(rollDice());
    let { turn, tokens } = getState();
    let turn_tokens = tokens.filter(t => t.player === turn.player );
    dispatch({
      type: TURN_START,
      turn_tokens,
      prev: turn.prev_value
    });
    // dispatch(validTokens(turn, tokens));
    let valid_tokens = validTokens(turn, turn_tokens);
    dispatch({
      type: VALID_TOKENS,
      valid_tokens
    });
    if(valid_tokens.length === 0) {
      setTimeout(() => {
        dispatch(nextTurn(turn))
        dispatch({type: END_TURN})
      }, 1000);
    } 
  }

}

function activateToken(token) {
  return {
    type: ACTIVATED_TOKEN,
    token: Object.assign({}, token, {
      active: true
    })
  }
}

function moveToken(token, turn) {
  let pos = move(token, turn.value, token.player);
  let { top, left } = getTokenPos(pos);
  return {
    type: TOKEN_MOVED,
    token: Object.assign({}, token, {
      pos,
      top,
      left,
      active: true
    })
  }
}

function nextTurn(turn) {
  let payload;
  if((turn.value === 6 && turn.six_count !== 3) || turn.value === 1) {
    payload = Object.assign({}, turn, {
      value: 0,
      progress: false
    });
  } else {
    let player = turn.player === 'red' ? 'blue'
                : turn.player === 'blue' ? 'yellow'
                : turn.player === 'yellow' ? 'green'
                : turn.player === 'green' ? 'red' : null;
    payload = Object.assign({}, turn, {
      player,
      value: 0,
      progress: false
    });
  }
  return {
    type: NEXT_TURN,
    turn: payload
  }
}

export function checkTokenExists(array, value) {
  let check = array.filter( a => {
    if(a.id === value.id) {
      return true;
    }
    return false;
  });
  if(check.length === 1) return true;
  return false;
}

function updateToken(token, getState) {
  let { tokens } = getState();
  let new_token = tokens.find(t => t.id === token.id);

  return new_token;
}

function getSquareAtPos(pos, getState) {
  let rows = getState().board;
  let squares = [].concat(...rows);
  let square = squares.find(s => s.name === pos);
  return square;
}

function getTokensAtPos(pos, getState) {
  let { tokens } = getState();
  return tokens.filter(t => t.pos === pos); 
}

function killTokens(token, getState) {
  let killer = updateToken(token, getState);
  let scene_of_crime = getSquareAtPos(killer.pos, getState);
  console.log(scene_of_crime);
  if(scene_of_crime.content === "☆" || scene_of_crime.content === "S") {
    return {
      type: SAFE_STATE
    }
  }
  let possible_victims = getTokensAtPos(scene_of_crime.name, getState);
  let victims = possible_victims.filter(t => t.player !== killer.player);
  return {
    type: KILLING_TOKENS,
    victims
  }
}

export function execTurn(token, turn) {
  return (dispatch, getState) => {
    let { valid_tokens } = getState();
    if(turn.player === token.player && valid_tokens.length > 0){
      if(checkTokenExists(valid_tokens,token)) {
        if(turn.value === 1 && !token.active) {
          dispatch(activateToken(token));
        }
        dispatch(moveToken(token, turn));
        dispatch(killTokens(token, getState));
        dispatch(nextTurn(turn));
        dispatch({
          type: END_TURN
        })
      }
    }
  }
}





































// export function changeValue(val) {
//   return {
//     type: CHANGE_VAL,
//     val
//   }
// }

// export function changeTurn(turn) {
//   return {
//     type: CHANGE_TURN,
//     prev: {
//       player: turn.player,
//       value: turn.value,
//       six_count : turn.six_count
//     }
//   }
// }

// function changePlayer(turn) {
//   let payload;
//   if((turn.value === 6 && turn.six_count !== 3) || turn.value === 1) {
//     payload = Object.assign({}, turn, {
//       six_count: turn.six_count++,
//       value: 0,
//       progress: false
//     });
//   } else {
//     let player = turn.player === 'red' ? 'blue'
//                 : turn.player === 'blue' ? 'yellow'
//                 : turn.player === 'yellow' ? 'green'
//                 : turn.player === 'green' ? 'red' : null;
//     payload = Object.assign({}, turn, {
//       player,
//       value: 0,
//       progress: false
//     });
//   }
//   return {
//     type: PLAYER_CHANGED,
//     turn: payload
//   }
// }


// export function execTurn(token, turn) {
//   return dispatch => {
//     if(token.player === turn.player && turn.value !== 0) {
//       token.active && dispatch(moveToken(token, turn));
//       dispatch(changePlayer(turn));
//     }
//   }
// }
