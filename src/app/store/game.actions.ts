import { createAction, props } from "@ngrx/store";

export const setUserAttempts = createAction('[App Component] SET User Attempts Array', props<{ userAttempts: string[] }>())
export const addUserAttempt = createAction('[App Component] ADD Attempt', props<{ userGuess: string }>())
export const resetUserAttempts = createAction('[App Component] RESET Attempts')

export const setGameStatus = createAction('[App Component] SET Game Status', props<{ gameStatus: string }>())

export const setSolution = createAction('[App Component] SET Game Solution', props<{ solution: string }>())

export const setUnusedProperty = createAction('[App Component] SET Unused Propery', props<{ unusedProperty: any }>())