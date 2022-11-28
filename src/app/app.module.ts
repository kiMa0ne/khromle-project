import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ColorItemComponent } from './components/color-item/color-item.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InputItems } from './components/input-items/input-items.component';
import { VirtualKeyboardComponent } from './components/virtual-keyboard/virtual-keyboard.component';
import { UserAttemptsComponent } from './components/user-attempts/user-attempts.component';
import { StoreModule } from '@ngrx/store';
import { gameReducer } from './store/game.reducer';
import { ToastrModule } from 'ngx-toastr';
import { DataService } from './services/dataService.service';
import { CookieService } from 'ngx-cookie-service';
// import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    ColorItemComponent,
    InputItems,
    VirtualKeyboardComponent,
    UserAttemptsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    StoreModule.forRoot({ gameState: gameReducer }),
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-center',
      preventDuplicates: true,
      easeTime: 300,
      maxOpened: 3,
      autoDismiss: true,
      tapToDismiss: true
    }),
  ],
  providers: [DataService, CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
