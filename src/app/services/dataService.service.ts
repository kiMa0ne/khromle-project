import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import * as htmlToImage from 'html-to-image'

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() {}

  // 1) Called by the share function
  // 2) Generate the cavas by calling the user-attempts' function
  // 3) Return to the color-item component the generated canvas.

}