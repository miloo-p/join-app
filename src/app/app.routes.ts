import { Routes } from '@angular/router';
import { Contacts } from './pages/contacts/contacts';
import { Board } from './pages/board/board';
import { AddTask } from './pages/add-task/add-task';

export const routes: Routes = [
  { path: 'contacts', component: Contacts },
  { path: 'board', component: Board },
    { path: 'contacts', component: Contacts },
    { path: 'add-task', component: AddTask },
];
