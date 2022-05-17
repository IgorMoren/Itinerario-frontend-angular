import { Component, OnInit } from '@angular/core';
import { ComunicacionService } from './comunicacion.service';

@Component({
  selector: 'app-comunicacion',
  templateUrl: './comunicacion.component.html',
  styleUrls: ['./comunicacion.component.sass']
})
export class ComunicacionComponent implements OnInit {

  /* Input-output */

  txtInput: string = '';

  txt: string = '';

  showInput() {
    this.txtInput = 'Parent using input'
  }

  showOutput(value: string) {
    this.txt = value;
  }

  /* Fin output-input */

  /* Throug services */
  constructor(private comunicacionService: ComunicacionService) { }

  ngOnInit(): void {

    this.comunicacionService.childMsg$
      .subscribe(
        msg => {
          this.txt = msg;
        }
      )

  }
  sendToChild() {

    this.comunicacionService.sendParentMsg('Parent using service');

  }
  /* End through services */

}
