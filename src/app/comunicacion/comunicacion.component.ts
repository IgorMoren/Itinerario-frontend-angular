import { Component, Input, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ComunicacionService } from './comunicacion.service';

@Component({
  selector: 'app-comunicacion',
  templateUrl: './comunicacion.component.html',
  styleUrls: ['./comunicacion.component.sass']
})
export class ComunicacionComponent implements OnInit {

  observableToChild = new Subject();
  observableFromChild!: string;

  /* Input-output */

  txtInput: string = '';

  txt: string = '';

  showInput() {
    this.txtInput = 'Parent using input';
  }

  showOutput(value: string) {
    this.txt = value;
  }

  /* End input-output */

  constructor(private comunicacionService: ComunicacionService) { }

  ngOnInit(): void {

    /* Through services */
    this.comunicacionService.getServiceParentMessage()
      .subscribe(
        (msg: string) => {
          this.txt = msg;
        }
      )
    /* Through observable*/
    /* this.observableFromChild$.subscribe((msg: any) => {
      this.observableFromChild = msg;
    }
    ) */
  }
  sendToChildService() {
    this.comunicacionService.setServiceChildMessage('Parent using service');
  }
  /* End through services */


  /* Through observable */

  /* Receive observable */
 /*  @Input()
  observableFromChild$ = new Observable; */

  // Sending observable to child
  
  /*sendObservableToChild() {
    this.observableToChild.next('Parent using observable');
  } */

  // Receive obs from child
  /* receiveObservableFromChild(event: any){
    event.subscribe((msg: any)=>{
      this.txt = msg;
    })
  } */

}
