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
  userAttempts
  public colorToGuess$ = this.store.select(selectGameSolution)

  constructor(private store: Store<GameState>) {
  }

  ngOnInit(): void {
    this.colorToGuess$.subscribe(colorToGuess => this.colorToGuess = colorToGuess)
    this.colorArray = this.colorToGuess.split("").slice(1)

    this.userAttempts$.subscribe(userAttempts => this.userAttempts = userAttempts)
  }

  convertColorStringToArray(colorString: string) {
    return colorString.slice(1).split("")
  }
  
  // generateImage() {
  //   const node: any = document.getElementById('userAttempts')
  //   // this.dataService.generateImage(node)
  //   htmlToImage.toPng(node).then(dataUrl => {
  //       let img = new Image()
  //       img.src = dataUrl
  //       // console.log({img})
  //   }).catch(error => {
  //     console.error('Could not convert html to png', error)
  //   })
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
      ctx[i].fillRect(0, (i)*50, window.innerWidth, 50);
    }

    return canvasElement

    // document.body.appendChild(canvasElement)
  }
}
