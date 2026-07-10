import { Routes } from '@angular/router';
import { Contacts } from './pages/contacts/contacts';
import { MainPage } from './pages/main-page/main-page';
import { AddTask } from './pages/add-task/add-task';

export const routes: Routes = [
    { path: '', component: MainPage },
    { path: 'contacts', component: Contacts },
    { path: 'add-task', component: AddTask },
];
