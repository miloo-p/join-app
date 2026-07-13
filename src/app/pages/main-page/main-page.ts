import { Component, inject } from '@angular/core';
import { contactsService } from '../../shared/services/contacts-service';
import { tasksService } from '../../shared/services/tasks-service';
import { Contacts } from '../contacts/contacts';

@Component({
  selector: 'app-main-page',
  imports: [Contacts,],
  templateUrl: './main-page.html',
  styleUrl: './main-page.scss',
})
export class MainPage {

  dbContacts = inject(contactsService);
  dbTasks = inject(tasksService);

  ngOnInit() {
    this.dbContacts.getContacts();
    this.dbContacts.subscribeToContacts();

    this.dbTasks.getTasks();
    this.dbTasks.subscribeToTasks();
    // this.dbTasks.setTask([{
    //   title: 'Test Task',
    //   desc: 'This is a test task',
    //   due_date: '2026-08-02 16:30:00',
    //   status: 1,
    //   priority: 1,
    //   collaborators: [3,4] ,
    //   subtasks: [{name: 'Subtask 1', status: 0}, {name: 'Subtask 2', status: 0}]
    // }]);
  }
}
