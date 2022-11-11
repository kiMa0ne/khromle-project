import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
@Component({
  selector: 'app-virtual-keyboard',
  templateUrl: './virtual-keyboard.component.html',
  styleUrls: ['./virtual-keyboard.component.scss']
})
export class VirtualKeyboardComponent implements OnInit {

  @Output() handleInput = new EventEmitter<string>()
  @Output() handleDelete = new EventEmitter<any>()
  @Output() handleSubmit = new EventEmitter<any>()

  @Input() userString = ""

  availableInputs = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F']

  constructor() { }

  ngOnInit(): void {
    
  }

  handlePlayDigit(inputValue: string) {
    this.handleInput.emit(inputValue)
  }

  handlePlaySubmit() {
    this.handleSubmit.emit()
  }
  
  handlePlayBack() {
    this.handleDelete.emit()
  }

  canSubmit() {
    return this.userString.length < 6
  }



}
