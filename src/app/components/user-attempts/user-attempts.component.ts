import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { TextColorService } from 'src/app/services/textColor.service';
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
  userAttempts
  public colorToGuess$ = this.store.select(selectGameSolution)

  // guessColorRedGroup 
  // guessColorGreenGroup 
  // guessColorBlueGroup 

  constructor(private store: Store<GameState>, private textColorService: TextColorService) {
  }

  ngOnInit(): void {
    this.colorToGuess$.subscribe(colorToGuess => this.colorToGuess = colorToGuess)
    this.colorArray = this.colorToGuess.split("").slice(1)

    // this.guessColorRedGroup = this.colorArray[0] + this.colorArray[1]
    // this.guessColorGreenGroup = this.colorArray[2] + this.colorArray[3]
    // this.guessColorBlueGroup = this.colorArray[4] + this.colorArray[5]

    this.userAttempts$.subscribe(userAttempts => this.userAttempts = userAttempts)
  }

  convertColorStringToArray(colorString: string) {
    return colorString.slice(1).split("")
  }

  getTipClassFromColorChar(colorString: string[], index: number) {

    // if (index === 1 || index === 3 || index === 5) {
    //   const groupToGuess = `${this.colorArray[index - 1]}${this.colorArray[index]}`
    //   const userGroup = `${colorString[index - 1]}${colorString[index]}`
      
    // }

    const userCharIndex = this.inputValuesArray.indexOf(colorString[index])
    const correctCharIndex = this.inputValuesArray.indexOf(this.colorArray[index])

    const result = Math.abs(userCharIndex - correctCharIndex)

    switch(result) {
      case 0: return "correct-input"
      case 1: return "very-very-close-input"
      case 2: return "very-close-input"
      case 3: return "bad-position-input"
      default: return "incorrect-input"
    }
  }

  generateCanvas() {
    let canvasElement = document.createElement('canvas') as  HTMLCanvasElement
    canvasElement.setAttribute("style", "width: 500px")
    canvasElement.height = this.userAttempts.length * 50

    let ctx: any[] = []

    for (let i = 0; i < this.userAttempts.length; i++) {
      ctx[i] = canvasElement?.getContext("2d");
      ctx[i].beginPath(); 
      ctx[i].fillStyle = this.userAttempts[i];
      ctx[i].fillRect(0, i * 50, window.innerWidth, 50);
    }

    return canvasElement
  }

  getTextColor(hexColor){
    return this.textColorService.getContrastYIQ(hexColor)
  }
}
