import { createReducer, on } from "@ngrx/store";
import { addUserAttempt, resetUserAttempts, setGameStatus, setSolution, setUserAttempts } from "./game.actions";

export interface GameState {

  unusedProperty: 0,

  persistance: PersistanceState
}

export interface PersistanceState {
  currentStatus: string,
  solution: string,
  userAttempts: string[]
}

export const initialState: GameState = {
  unusedProperty: 0,

  persistance: {
    currentStatus: '',
    solution: '',
    userAttempts: [],
  }
}

export const gameReducer = createReducer(
  initialState,
  
  on(addUserAttempt, (state, { userGuess }) => {
    return {
      ...state,

      persistance: {
        ...state.persistance,

        userAttempts: [userGuess, ...state.persistance.userAttempts],
      }
    }
  }),
  on(resetUserAttempts, (state) => {
    return {
      ...state,

      persistance: {
        ...state.persistance,
        userAttempts: []
      }
    }
  }),
  on(setUserAttempts, (state, { userAttempts }) => {
    return {
      ...state,

      persistance: {
        ...state.persistance,
        userAttempts
      }
    }
  }),
  
  on(setGameStatus, (state, { gameStatus }) => {
    return {
      ...state,

      persistance: {
        ...state.persistance,
        currentStatus: gameStatus
      }
    }
  }),

  on(setSolution, (state, { solution }) => {
    return {
      ...state,

      persistance: {
        ...state.persistance,
        solution: solution
      }
    }
  }),




)