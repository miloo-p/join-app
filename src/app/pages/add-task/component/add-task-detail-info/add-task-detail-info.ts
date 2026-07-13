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
  isUrgentSelected = false;
  isMediumSelected = false;
  isLowSelected = false;

  toggleDropdown(): void {
    this.isContactDropdownOpen = !this.isContactDropdownOpen;
  }

  toggleUrgentBtn(): void {
    this.isUrgentSelected = !this.isUrgentSelected
  };
  
  toggleMediumBtn(): void {
    this.isMediumSelected = !this.isMediumSelected
  };

  toggleLowBtn(): void {
    this.isLowSelected = !this.isLowSelected
  };
}
