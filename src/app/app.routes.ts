import { Routes } from '@angular/router';
import { Contacts } from './pages/contacts/contacts';
import { Board } from './pages/board/board';
import { AddTask } from './pages/add-task/add-task';
import { Summary } from './pages/summary/summary';

export const routes: Routes = [
  { path: '', component: Summary},
  { path: 'contacts', component: Contacts },
  { path: 'board', component: Board },
  { path: 'contacts', component: Contacts },
  { path: 'add-task', component: AddTask },
];
