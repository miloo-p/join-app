import { Component } from '@angular/core';
import { AddTaskBasicInfo } from './component/add-task-basic-info/add-task-basic-info';
import { AddTaskDetailInfo } from './component/add-task-detail-info/add-task-detail-info';

@Component({
  selector: 'app-add-task',
  imports: [AddTaskBasicInfo, AddTaskDetailInfo],
  templateUrl: './add-task.html',
  styleUrl: './add-task.scss',
})
export class AddTask {}
