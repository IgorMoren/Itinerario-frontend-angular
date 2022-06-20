import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ComunicacionService {
  /* Como convenio uso de las variables privadas con _variable */

  private _parentMsgSource = new BehaviorSubject<string>('');

  private _childMsgSource = new BehaviorSubject<string>('');

  constructor() {}

  getServiceParentMessage() {
    return this._parentMsgSource;
  }

  setServiceParentMessage(value: string) {
    this._parentMsgSource.next(value);
  }

  getServiceChildMessage() {
    return this._childMsgSource;
  }

  setServiceChildMessage(value: string) {
    this._childMsgSource.next(value);
  }
}
