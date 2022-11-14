import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { GameState } from '../../store/game.reducer';
import { selectGameSolution, selectUserAttempts } from '../../store/game.selectors';
@Component({
  selector: 'app-user-attempts',
  templateUrl: './user-attempts.component.html',
  styleUrls: ['./user-attempts.component.scss']
})
export class UserAttemptsComponent implements OnInit {
  colorToGuess = ""

  inputValuesArray = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F']

  groupColors = 3

  colorArray: any = []

  public userAttempts$ = this.store.select(selectUserAttempts)
  public colorToGuess$ = this.store.select(selectGameSolution)

  constructor(private store: Store<GameState>) {
    // this.storeUserAttempts$ = store.select('userAttempts')
  }

  ngOnInit(): void {
    this.colorToGuess$.subscribe(colorToGuess => this.colorToGuess = colorToGuess)
    this.colorArray = this.colorToGuess.split("").slice(1)
    console.log(this.colorArray)
  }

  convertColorStringToArray(colorString: string) {
    return colorString.slice(1).split("")
  }

  // getTipClassFromColorChar(colorChar: string, index: number) {

  //   console.log("COLOR ARRAY: ", this.colorArray)

  //   //# AB 12 34
  //   //  R  G  B
    
  //   let result = 'incorrect-input'
  //   if (colorChar === this.colorArray[index]) {
  //     result = 'correct-input'
  //   } else {
  //     // debugger
  //     const nextIndex = index + 1
  //     const previousIndex = index - 1
  //     if ((nextIndex < this.colorArray.length && colorChar === this.colorArray[nextIndex]) || previousIndex >= 0 && colorChar === this.colorArray[previousIndex]) {
  //       result = 'very-close-input'
  //     }
  //   }
  //   return result
  //   //GREEN: CORRECT
  //   //YELLOW: VERY CLOSE
  //   //ORANGE: VERY CLOSE --
  //   //PURPLE: CORRECT BUT CHAR SHOULD BE IN ANOTHER POSITION
  //   //WHITE: TOTALLY INCORRECT
  // }

  getTipClassFromColorChar(colorString: string[], index: number) {
    const userCharIndex = this.inputValuesArray.indexOf(colorString[index])
    const correctCharIndex = this.inputValuesArray.indexOf(this.colorArray[index])

    const result = Math.abs(userCharIndex - correctCharIndex)

    switch(result) {
      case 0: return "correct-input"
      case 1: return "very-very-close-input"
      case 2: return "very-close-input"
      case 3: return "bad-position-input"
      // case 4: return ""

      default: return "incorrect-input"
    }

  }

  // getBgColor(colorString: string) {
  //   return `#${colorString}`
  // }

}
