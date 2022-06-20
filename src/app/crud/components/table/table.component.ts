import { CommunicationCrudService } from './../../services/communication.service';
import { User } from './../../interfaces/user';
import { CrudService } from './../../services/crud.service';
import { Component, OnInit, EventEmitter } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Output } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.sass'],
})
export class TableComponent implements OnInit {
  displayedColumns: string[] = [
    'name',
    'email',
    'subscribed',
    'country',
    'city',
    'actions',
  ];

  dataSource!: MatTableDataSource<User>;

  @Output() emitter: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private crudService: CrudService,
    private communicationService: CommunicationCrudService
  ) {}

  ngOnInit(): void {
    //this.obtainData();

    /* Angular View Updating Using Observables, Behavior Subject, and Event Emitters 
  Unrelated Components: Observables + Behavior Subjects
  https://medium.com/@tholaday777/angular-view-updating-using-observables-behavior-subject-and-event-emitters-acaf37500143 */
    this.communicationService.currentData.subscribe(() => {
      this.obtainData();
    });
  }

  obtainData() {
    this.crudService.getUsers().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
      },
    });
  }

  sendId(user: User) {
    this.emitter.emit(user);
  }

  deleteData(id: string) {
    this.crudService.deleteUser(id).subscribe((data) => this.obtainData());
  }
}
