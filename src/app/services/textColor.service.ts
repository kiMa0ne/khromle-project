import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TextColorService {

  constructor() {}
  
  getContrastYIQ(hexColor){
    const digitColor = hexColor.replace("#", "")

    var r = parseInt(digitColor.substr(0,2),16)
    var g = parseInt(digitColor.substr(2,2),16)
    var b = parseInt(digitColor.substr(4,2),16)

    var yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000

    return (yiq >= 128) ? 'black' : 'white'
  }

}
