import { Component } from '@angular/core';
import { AddTask } from '../../../add-task/add-task';

@Component({
  selector: 'app-task-dialog',
  imports: [AddTask],
  templateUrl: './task-dialog.html',
  styleUrl: './task-dialog.scss',
})
export class TaskDialog {}
