import { Component, Input, OnInit, ElementRef, ViewChild, Output, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';
import { GameState } from '../../store/game.reducer';
import { selectGameCurrentStatus, selectPersistance } from '../../store/game.selectors';
import { ToastrService } from 'ngx-toastr'
import { NgNavigatorShareService } from 'ng-navigator-share';
import { TextColorService } from 'src/app/services/textColor.service';

@Component({
  selector: 'app-color-item',
  templateUrl: './color-item.component.html',
  styleUrls: ['./color-item.component.scss']
})

export class ColorItemComponent implements OnInit {
  bgColor: string
  statusMessage: string

  public gamePersistance$ = this.store.select(selectPersistance)
  public gameStatus$ = this.store.select(selectGameCurrentStatus)

  private ngNavigatorShareService: NgNavigatorShareService

  persistanceState: any
  gameStatus: any

  
  @Output() handleShareVictory = new EventEmitter<any>()

  constructor(private store: Store<GameState>, public toastr: ToastrService, ngNavigatorShareService: NgNavigatorShareService, private textColorService: TextColorService) {
    this.ngNavigatorShareService = ngNavigatorShareService;
  }

  ngOnInit() {
    this.gamePersistance$.subscribe(gamePersistance => this.persistanceState = gamePersistance)
    this.gameStatus$.subscribe(gameStatus => this.gameStatus = gameStatus)

    this.bgColor = this.persistanceState.solution
    console.log("STATE: ", this.persistanceState)

  }

  shareVictory() {
    this.handleShareVictory.emit()
  }

  getTextColor(hexColor){
    return this.textColorService.getContrastYIQ(hexColor)
  }
}
