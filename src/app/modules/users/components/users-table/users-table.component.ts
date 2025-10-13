import { Component, inject, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { User } from '../../models/user.model';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { initFlowbite } from 'flowbite';
import { ModalUserFormComponent } from "../modal-user-form/modal-user-form.component";
import { UsersPopUpComponent } from "../users-pop-up/users-pop-up.component";

@Component({
  selector: 'app-users-table',
  standalone: true,
  imports: [ReactiveFormsModule, ModalUserFormComponent, UsersPopUpComponent],
  templateUrl: './users-table.component.html',
  styleUrl: './users-table.component.scss'
})
export class UsersTableComponent implements OnInit {
  private userService = inject(UserService);
  itemsSelected = new Set<number>();
  isOpenModal = false;
  isOpenPopUp = false;
  updateUser: User | undefined;

  searchInput = new FormControl("");
  users: User[] = [];
  filteredUsers: User[] = [];

  ngOnInit() {
    this.loadUsers();
    this.searchInput.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(term => this.filterUsers(term || ''));
    initFlowbite();
  }

  loadUsers() {
    this.userService.getUsers().subscribe(users => {
      this.users = users;
      this.filterUsers(this.searchInput.value || '');
    });
  }

  filterUsers(term: string) {
    this.filteredUsers = this.users.filter(user => 
      user.nombre.toLowerCase().includes(term.toLowerCase()) ||
      user.correo.toLowerCase().includes(term.toLowerCase())
    );
  }

  toggleSelect(id: number) {
    this.itemsSelected.has(id) ? this.itemsSelected.delete(id) : this.itemsSelected.add(id);
  }

  isSelected(id: number): boolean {
    return this.itemsSelected.has(id);
  }

  toggleSelectAll() {
    this.isAllSelected() ? this.itemsSelected.clear() : this.filteredUsers.forEach(u => this.itemsSelected.add(u.id));
  }

  isAllSelected(): boolean {
    return this.filteredUsers.length > 0 && this.filteredUsers.every(u => this.itemsSelected.has(u.id));
  }

  isIndeterminate(): boolean {
    const selectedCount = this.filteredUsers.filter(u => this.itemsSelected.has(u.id)).length;
    return selectedCount > 0 && selectedCount < this.filteredUsers.length;
  }

  deleteItems() {
    if (!this.itemsSelected.size) return;
    this.userService.deleteUsers(Array.from(this.itemsSelected)).subscribe({
      next: () => {
        this.itemsSelected.clear();
        this.loadUsers();
      },
      error: error => {
        console.error('Error eliminando usuarios:', error);
        alert(error.error.message);
      }
    });
  }

  openCreateModal() {
    this.isOpenModal = true;
  }

  openEditModal(user: User) {
    this.updateUser = user;
    this.isOpenModal = true;
  }

  openPopUp() {
    this.isOpenPopUp = true;
  }

  closePopUp() {
    this.isOpenPopUp = false;
  }

  closeModal = () => {
    this.updateUser = undefined;
    this.isOpenModal = false;
    this.loadUsers();
  }
}
