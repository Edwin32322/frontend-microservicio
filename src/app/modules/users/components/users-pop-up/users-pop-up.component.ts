import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-users-pop-up',
  standalone: true,
  imports: [],
  templateUrl: './users-pop-up.component.html',
  styleUrl: './users-pop-up.component.scss'
})
export class UsersPopUpComponent {
  @Output() onDelete = new EventEmitter<void>();
  @Output() onClose = new EventEmitter<void>();
  confirmDelete() {
    this.onDelete.emit()
    this.onClose.emit()
  }
  closePopUp() {
    this.onClose.emit()
  }
}
