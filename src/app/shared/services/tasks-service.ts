import { Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environment';
import { createClient, RealtimeChannel } from '@supabase/supabase-js';
import { Task } from '../interfaces/tasks';

@Injectable({
  providedIn: 'root',
})
export class tasksService {
  supabase = createClient(environment.apiUrl, environment.apiKey);

  tasks = signal<Task[]>([]);

  channels: RealtimeChannel | undefined;

  // Create
  async setTask(tasks: Task[]) {
    const { data, error } = await this.supabase.from('tasks').insert(tasks).select();

    if (error) {
      console.error('Tasks insert error', error);
      return;
    }
    return data;
  }

  //Read
  async getTasks() {
    const { data: tasks, error } = await this.supabase.from('tasks').select('*');
    if (!tasks) return;
    this.tasks.set(tasks);
  }

  async getSingleTask(id: number) {
    const { data: task, error } = await this.supabase
      .from('tasks')
      .select('*')
      .eq('id', id)
      .single();
    if (error) {
      console.error('Tasks get single task error', error);
      return;
    }
    return task;
  }

  //Update
  async updateTask(task: Task) {
    const { error } = await this.supabase.from('tasks').update(task).eq('id', task.id);
    if (error) {
      console.error('Tasks update task error', error);
    }
  }

  //Delete
  async deleteTask(id: number) {
    const response = await this.supabase.from('tasks').delete().eq('id', id);
  }

  //Subscribe
  async subscribeToTasks() {
    if (this.channels) {
      return;
    }
    this.channels = this.supabase
      .channel('tasks-channel')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'tasks' }, (payload) => {
        this.handlePayload(payload);
      })
      .subscribe();
  }

  handlePayload(payload: any) {
    if (payload.eventType === 'INSERT') {
      this.tasks.update((tasks) => [...tasks, payload.new]);
    } else if (payload.eventType === 'UPDATE') {
      this.tasks.update((tasks) =>
        tasks.map((task) => (task.id === payload.new.id ? payload.new : task)),
      );
    } else if (payload.eventType === 'DELETE') {
      this.tasks.update((tasks) => tasks.filter((task) => task.id !== payload.old.id));
    }
  }

  ngOnDestroy() {
    if (this.channels) {
      this.supabase.removeChannel(this.channels);
    }
  }
}
