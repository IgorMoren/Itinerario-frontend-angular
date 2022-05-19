import { Component } from '@angular/core';

@Component({
  selector: 'app-switch',
  templateUrl: './switch.component.html',
  styleUrls: ['./switch.component.sass']
})
export class SwitchComponent {

  onOffController: boolean = false;
  onOff: string = 'Off';
  colorRed: boolean = false;
  colorYellow: boolean = false;
  colorGreen: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  lightOff() {
    this.colorRed = false;
    this.colorYellow = false;
    this.colorGreen = false;
  }

  setButtonColor() {
    this.lightOff();
    if (this.onOffController == false) {
      this.onOffController = true;
      this.onOff = 'On';   

    } else {
      this.onOffController = false;
      this.onOff = 'Off';      
    }
  }

  showColor(event: any) {
    this.lightOff();
    if (event.srcElement.value == 'green') {
      this.colorGreen = true;
    } else if (event.srcElement.value == 'yellow') {
      this.colorYellow = true;
    } else {
      this.colorRed = true;
    };
  }
}
