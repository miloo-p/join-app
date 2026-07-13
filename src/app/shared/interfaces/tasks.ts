export interface Task {
      id?: number;
      title: string;
      desc?: string;
      due_date: string;
      status: number;
      priority: number;
      subtasks?: {name: string, status: number}[];
      collaborators:number[];
}