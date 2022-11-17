
import { createSelector } from "@ngrx/store";
import { GameState, PersistanceState } from "./game.reducer";

export const selectGameState = (state: any) => state.gameState

export const selectPersistance = createSelector(
  selectGameState,
  (state: GameState) => state.persistance
)

export const selectUserAttempts = createSelector(
  selectPersistance,
  (state: PersistanceState) => state.userAttempts
)

export const selectGameCurrentStatus = createSelector(
  selectPersistance,
  (state: PersistanceState) => state.currentStatus
)

export const selectGameSolution = createSelector(
  selectPersistance,
  (state: PersistanceState) => state.solution
)

export const selectUnusedProperty = createSelector(
  selectGameState,
  (state: GameState) => state.unusedProperty
)