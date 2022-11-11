import { Component, OnInit } from '@angular/core';
import ColorHash from 'color-hash'
import { addUserAttempt, resetUserAttempts, setGameStatus, setSolution, setUserAttempts } from './store/game.actions';
import { Store } from '@ngrx/store';
import { GameState } from './store/game.reducer';
import { selectGameCurrentStatus, selectPersistance, selectUserAttempts } from './store/game.selectors';
import { ToastrService } from 'ngx-toastr'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  colorHash = new ColorHash()
  color = ''

  userString: string[] = []

  public userAttempts$ = this.store.select(selectUserAttempts)
  userAttempts: any

  public gameStatus$ = this.store.select(selectGameCurrentStatus)
  gameStatus: any

  constructor(private store: Store <GameState>, public toastr: ToastrService) {}

  ngOnInit() {
    //STORE
    this.gameStatus$.subscribe(gameStatus => this.gameStatus = gameStatus)
    this.userAttempts$.subscribe(userAttempts => this.userAttempts = userAttempts)

    console.log("GAME SRTATUS: ",this.gameStatus)
    // localStorage.clear()
    addEventListener('keydown', (event: KeyboardEvent) => {
      const userInput = event.key.toUpperCase()
      if (['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'].includes(userInput)) {
        this.handlePlayDigit(userInput)
      } else if (event.key === "Enter") {
        this.handlePlaySubmit()
      } else if (event.key === 'Backspace') {
        this.handlePlayBack()
      }
    })

    //SET SOLUTION
    const dateString = new Date().toUTCString().slice(0, 16)
    this.color = this.colorHash.hex(dateString).toUpperCase()
    this.store.dispatch(setSolution({ solution: this.color }))

    //Initialize userAttempts from localStorage
    const localStorageUserAttemptsString = localStorage.getItem('userAttempts')
    const localStorageUserAttempts = localStorageUserAttemptsString ? JSON.parse(localStorageUserAttemptsString) : null

    if (localStorageUserAttempts) {
      this.store.dispatch(setUserAttempts({userAttempts: localStorageUserAttempts}))
    }
    //Initialize gameStatus from localStorage
    const localStorageGameStatus = localStorage.getItem('gameStatus')
    console.log("GAME STATUS LOCAL STORAGE: ", localStorageGameStatus)
    if (localStorageGameStatus) {
      this.store.dispatch(setGameStatus({gameStatus: localStorageGameStatus}))
    }
  }

  resetGuesses() {
    this.store.dispatch(resetUserAttempts())
    localStorage.clear()
  }

  handlePlayDigit(userInput: string) {
    if (this.userString.length < 6 && this.gameStatus !== 'VICTORY') {
      this.userString.push(userInput)
    }
  }

  handlePlaySubmit() {
    if (!(this.userString.length < 6) && this.gameStatus !== 'VICTORY') {
      const userStringValue = "#" + this.getUserStringValue()
      if (this.userAttempts.includes(userStringValue)) {
        this.toastr.error("Duplicate guess not allowed")
        this.userString = []
        return
      }

      this.store.dispatch(addUserAttempt({ userGuess: userStringValue}))
      localStorage.setItem('userAttempts', JSON.stringify(this.userAttempts))

      if ( userStringValue === this.color) {
        // this.statusMessage = "Share!"
        this.store.dispatch(setGameStatus({ gameStatus: "VICTORY" }))
        localStorage.setItem('gameStatus', this.gameStatus)
      }

      this.userString = []
    }
  }

  handlePlayBack() {
    if (this.gameStatus !== 'VICTORY'){
      this.userString.pop()
    }
  }

  getUserStringValue() {
    return this.userString.join("")
  }
}
