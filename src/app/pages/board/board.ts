import { Component } from '@angular/core';
import { TaskCard } from './components/task-card/task-card';
import { TaskOverlay } from './components/task-overlay/task-overlay';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [TaskCard, TaskOverlay],
  templateUrl: './board.html',
  styleUrl: './board.scss',
})
export class Board {}
