import { Routes } from '@angular/router';
import { Contacts } from './pages/contacts/contacts';
import { MainPage } from './pages/main-page/main-page';
import { Board } from './pages/board/board';

export const routes: Routes = [
  { path: '', component: MainPage },
  { path: 'contacts', component: Contacts },
  { path: 'board', component: Board },
];
