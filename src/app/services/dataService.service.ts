import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import * as htmlToImage from 'html-to-image'

@Injectable({
  providedIn: 'root'
})
export class DataService {
  
  // private htmlElement$ = new BehaviorSubject<any>({});
  // htmlElement$ = this.htmlElement$.asObservable();

  // setProduct(product: any) {
  //   this.product$.next(product);
  // }

  imgToBeShared

  constructor() { }
  
  generateImage(node) {
    htmlToImage.toPng(node).then(dataUrl => {
        let img = new Image()
        img.src = dataUrl

        this.imgToBeShared = img
    }).catch(error => {
      console.error('Could not convert html to png', error)
    })
  }

}