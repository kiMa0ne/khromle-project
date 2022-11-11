import { Component, Input, OnInit } from '@angular/core'

@Component({
  selector: 'app-input-items',
  templateUrl: './input-items.component.html',
  styleUrls: ['./input-items.component.scss']
})

export class InputItems {

  @Input() userString: string[] = []

  stringArray: string[] = ['', '', '', '', '', '']

  getColorPreview() {
    return `#${this.userString.join("")}`
  }

}
