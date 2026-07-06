import { Routes } from '@angular/router';
import { Contacts } from './pages/contacts/contacts';
import { MainPage } from './pages/main-page/main-page';

export const routes: Routes = [
    { path: '', component: MainPage },
    { path: 'contacts', component: Contacts }
];
