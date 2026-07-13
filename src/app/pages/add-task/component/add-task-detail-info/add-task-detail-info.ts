import { Component, inject, OnInit } from '@angular/core';
import { ButtonComponent } from '../../../../shared/components/button/button.component';

import { ContactSelection } from '../contact-selection/contact-selection';

@Component({
  selector: 'app-add-task-detail-info',
  standalone: true,
  imports: [ButtonComponent, ContactSelection],
  templateUrl: './add-task-detail-info.html',
  styleUrl: './add-task-detail-info.scss',
})
export class AddTaskDetailInfo {

  isContactDropdownOpen = false;

  toggleDropdown(): void {
    this.isContactDropdownOpen = !this.isContactDropdownOpen;
  }
}
