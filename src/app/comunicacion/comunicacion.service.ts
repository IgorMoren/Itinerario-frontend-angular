import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComunicacionService {

  
  /* Como convenio uso de las variables privadas con _variable */
  
  private _parentMsgSource = new Subject<string>();
  
  private _childMsgSource = new Subject<string>();
  
  parentMsg$ = this._parentMsgSource.asObservable();

  childMsg$ = this._childMsgSource.asObservable();

  constructor() { }

  sendParentMsg( msg:string ){

    this._parentMsgSource.next(msg);

  }
  
  sendChildMsg( msg:string ){

    this._childMsgSource.next(msg);

  }
  
}
