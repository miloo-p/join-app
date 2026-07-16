import { Routes } from '@angular/router';
import { Contacts } from './pages/contacts/contacts';
import { Board } from './pages/board/board';

export const routes: Routes = [
  { path: 'contacts', component: Contacts },
  { path: 'board', component: Board },
];
