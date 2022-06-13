import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CommunicationCrudService {
  data: object = {};

  /* Angular View Updating Using Observables, Behavior Subject, and Event Emitters 
  Unrelated Components: Observables + Behavior Subjects
  https://medium.com/@tholaday777/angular-view-updating-using-observables-behavior-subject-and-event-emitters-acaf37500143 */
  private dataSub = new BehaviorSubject<object>(this.data);

  currentData = this.dataSub.asObservable();

  constructor() {}

  changeDataSub(newDat: object) {
    this.dataSub.next(newDat);
  }
}
