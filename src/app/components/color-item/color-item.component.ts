import { Component, Input, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { GameState } from '../../store/game.reducer';
import { selectGameCurrentStatus, selectPersistance } from '../../store/game.selectors';
import { ToastrService } from 'ngx-toastr'
import { NgNavigatorShareService } from 'ng-navigator-share';

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

  @ViewChild('shareBtn') elementTest: ElementRef;

  persistanceState: any
  gameStatus: any

  constructor(private store: Store<GameState>, public toastr: ToastrService, ngNavigatorShareService: NgNavigatorShareService) {
    this.ngNavigatorShareService = ngNavigatorShareService;
  }

  ngOnInit() {
    this.gamePersistance$.subscribe(gamePersistance => this.persistanceState = gamePersistance)
    this.gameStatus$.subscribe(gameStatus => this.gameStatus = gameStatus)

    this.bgColor = this.persistanceState.solution
    console.log("STATE: ", this.persistanceState)

  }

  shareVictory() {
    if (!this.ngNavigatorShareService.canShare()) {
      alert(`This service/api is not supported in your Browser`);
      return;
    }

    this.ngNavigatorShareService.share({
      title: 'I WON!!!',
      text: `I beat the game after ${this.persistanceState.userAttempts.length} attempts`,
      url: 'https://khromle-project.vercel.app/',
      files: []
    }).then( (response) => {
      console.log(response);
    })
    .catch( (error) => {
      console.log(error);
    });

    // this.toastr.success("Copied to clipboard")
    // console.log("TEST: ", this.elementTest)
  }
  
  // generateImage(){
  //   var node:any = document.getElementById('image-section');
  //   htmlToImage.toPng(node)
  //     .then(function (dataUrl) {
  //       var img = new Image();
  //       img.src = dataUrl;
  //       document.body.appendChild(img);
  //     })
  //     .catch(function (error) {
  //       console.error('oops, something went wrong!', error);
  //     });
  // }

}
