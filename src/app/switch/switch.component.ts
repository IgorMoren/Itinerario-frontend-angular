import { Component } from '@angular/core';

@Component({
  selector: 'app-switch',
  templateUrl: './switch.component.html',
  styleUrls: ['./switch.component.sass'],
})
export class SwitchComponent {
  onOffController: boolean = false;
  onOff: string = 'Off';
  colorRed: boolean = false;
  colorYellow: boolean = false;
  colorGreen: boolean = false;

  beforeColor: string = '';

  constructor() {}

  ngOnInit(): void {}

  lightOff() {
    this.colorRed = false;
    this.colorYellow = false;
    this.colorGreen = false;
  }

  setButtonColor() {
    this.lightOff();
    if (!this.onOffController) {
      this.onOffController = true;
      this.onOff = 'On';

      switch (this.beforeColor) {
        case 'green':
          this.colorGreen = true;
          break;
        case 'yellow':
          this.colorYellow = true;
          break;
        case 'red':
          this.colorRed = true;
          break;
        default:
          this.lightOff();
      }

      console.log(this.beforeColor);
    } else {
      console.log(this.beforeColor);

      this.onOffController = false;
      this.onOff = 'Off';
    }
  }

  showColor(event: any) {
    this.lightOff();
    if (event.srcElement.value === 'green') {
      this.beforeColor = event.srcElement.value;
      this.colorGreen = true;
    } else if (event.srcElement.value === 'yellow') {
      this.beforeColor = event.srcElement.value;
      this.colorYellow = true;
    } else {
      this.beforeColor = event.srcElement.value;
      this.colorRed = true;
    }
  }
}
