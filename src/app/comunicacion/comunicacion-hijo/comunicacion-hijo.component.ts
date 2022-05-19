import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ComunicacionService } from '../comunicacion.service';


@Component({
  selector: 'app-comunicacion-hijo',
  templateUrl: './comunicacion-hijo.component.html',
  styleUrls: ['./comunicacion-hijo.component.sass']
})
export class ComunicacionHijoComponent implements OnInit {
  outputToParent!: string;
  observableToParent = new Subject();

  /* Comunication Input-Output */
  @Input()
  txt: string = '';

  @Output()
  textoOutput: EventEmitter<string> = new EventEmitter<string>();

  showOutput() {
    this.textoOutput.emit(this.outputToParent = 'Child using output');
  }
  /* End Input-Output */


  constructor(private _comunicacionService: ComunicacionService) { }

  ngOnInit(): void {

    /* Through services */
    this._comunicacionService.getServiceChildMessage()
      .subscribe(
        (msg: string) => {
          this.txt = msg;
        }
      );
    /* this.observableFromParent$.subscribe((msg: any) => {
      this.txt = msg;
    }) */
  }
  sendToParentService() {
    this._comunicacionService.setServiceParentMessage('Child using service');
  }
  /* End through services */

  //Receive observable 
  /* @Input()
  observableFromParent$ = new Observable(); */

  //  Observable to parent
 /*  @Output()
  observableOutputToParent: EventEmitter<any> = new EventEmitter<any>();

  sendObservableToParent() {
    this.observableToParent.next('Child using observable');
    this.observableOutputToParent.emit(this.observableToParent);
  } */
}
