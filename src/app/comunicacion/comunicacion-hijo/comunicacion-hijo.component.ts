import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ComunicacionService } from '../comunicacion.service';

@Component({
  selector: 'app-comunicacion-hijo',
  templateUrl: './comunicacion-hijo.component.html',
  styleUrls: ['./comunicacion-hijo.component.sass'],
})
export class ComunicacionHijoComponent implements OnInit, OnDestroy {
  outputToParent: string = '';
  observableToParent = new Subject();
  alive$ = new Subject<boolean>();

  /* Comunication Input-Output */
  @Input()
  txt: string = '';

  @Output()
  textoOutput: EventEmitter<string> = new EventEmitter<string>();

  showOutput() {
    this.textoOutput.emit((this.outputToParent = 'Child using output'));
  }
  /* End Input-Output */

  constructor(private _comunicacionService: ComunicacionService) {}

  ngOnInit(): void {
    /* Through services */
    this._comunicacionService
      .getServiceChildMessage()
      .subscribe((msg: string) => {
        console.log('Ei');

        this.txt = msg;
      });
    this.observableFromParent$
      .pipe(takeUntil(this.alive$))
      .subscribe((msg: any) => {
        this.txt = msg;
      });
  }

  ngOnDestroy(): void {
    this.alive$.next(true);
    this.alive$.complete();
  }

  sendToParentService() {
    this._comunicacionService.setServiceParentMessage('Child using service');
  }
  /* End through services */

  //Receive observable
  @Input()
  observableFromParent$ = new Observable();

  //  Observable to parent
  @Output()
  observableOutputToParent: EventEmitter<any> = new EventEmitter<any>();

  sendObservableToParent() {
    this.observableToParent.next('Child using observable');
    this.observableOutputToParent.emit(this.observableToParent);
  }
}
