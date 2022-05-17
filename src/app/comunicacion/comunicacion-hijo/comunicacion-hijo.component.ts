import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ComunicacionService } from '../comunicacion.service';


@Component({
  selector: 'app-comunicacion-hijo',
  templateUrl: './comunicacion-hijo.component.html',
  styleUrls: ['./comunicacion-hijo.component.sass']
})
export class ComunicacionHijoComponent implements OnInit {
  

  /* Comunication Input-Output */
  @Input() txt: string = '';

  @Output()
  textoOutput: EventEmitter<string> = new EventEmitter<string>();

  showOutput(value: string) {
    this.textoOutput.emit(value);
  }
  /* End Input-Output */

  /* Through services */
  constructor(private comunicacionService: ComunicacionService) { }

  ngOnInit(): void {
    this.comunicacionService.parentMsg$
      .subscribe(
        msg => {
          this.txt = msg;
        }
      )
  }
  sendToParent() {
    this.comunicacionService.sendChildMsg('Child using service');
  }

  /* En through services */

}
