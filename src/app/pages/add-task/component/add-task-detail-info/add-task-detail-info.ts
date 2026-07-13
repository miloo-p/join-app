import { Component, inject, OnInit } from '@angular/core';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { Supabase } from '../../../../shared/services/supabase';
import { ContactSelection } from '../contact-selection/contact-selection';

@Component({
  selector: 'app-add-task-detail-info',
  standalone: true,
  imports: [ButtonComponent, ContactSelection],
  templateUrl: './add-task-detail-info.html',
  styleUrl: './add-task-detail-info.scss',
})
export class AddTaskDetailInfo implements OnInit{
  contactDatabase = inject(Supabase);

  async ngOnInit() {
    await this.contactDatabase.getContacts();
    await this.contactDatabase.subscribeToContacts();
  }
}
