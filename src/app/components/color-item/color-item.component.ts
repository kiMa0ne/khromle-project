import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { GameState } from '../store/game.reducer';
import { selectGameCurrentStatus, selectPersistance } from '../store/game.selectors';
import { ToastrService } from 'ngx-toastr'

@Component({
  selector: 'app-color-item',
  templateUrl: './color-item.component.html',
  styleUrls: ['./color-item.component.scss']
})

export class ColorItemComponent implements OnInit {
  bgColor = ""
  statusMessage = ""

  public gamePersistance$ = this.store.select(selectPersistance)
  public gameStatus$ = this.store.select(selectGameCurrentStatus)

  persistanceState: any
  gameStatus: any

  constructor(private store: Store<GameState>, public toastr: ToastrService) {}

  ngOnInit() {
    this.gamePersistance$.subscribe(gamePersistance => this.persistanceState = gamePersistance)
    this.gameStatus$.subscribe(gameStatus => this.gameStatus = gameStatus)

    this.bgColor = this.persistanceState.solution
    console.log("STATE: ", this.persistanceState)

  }

  shareVictory() {
    this.toastr.success("Copied to clipboard")
    console.log("HEY!")
  }
}
