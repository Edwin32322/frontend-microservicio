import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UsersTableComponent } from './users-table.component';
import { UserService } from '../../services/user.service';
import { of } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';
import { ModalUserFormComponent } from '../modal-user-form/modal-user-form.component';
import { UsersPopUpComponent } from '../users-pop-up/users-pop-up.component';

const mockUsers = [
  { id: 1, nombre: 'Edwin', correo: 'edwin@test.com', edad: 25 },
  { id: 2, nombre: 'Juan', correo: 'juan@test.com', edad: 30 },
  { id: 3, nombre: 'Ana', correo: 'ana@test.com', edad: 28 }
];

describe('UsersTableComponent', () => {
  let component: UsersTableComponent;
  let fixture: ComponentFixture<UsersTableComponent>;
  let userService: jasmine.SpyObj<UserService>;

  beforeEach(async () => {
    const userServiceSpy = jasmine.createSpyObj('UserService', ['getUsers', 'deleteUsers']);

    await TestBed.configureTestingModule({
      imports: [UsersTableComponent, ReactiveFormsModule, ModalUserFormComponent, UsersPopUpComponent],
      providers: [
        { provide: UserService, useValue: userServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(UsersTableComponent);
    component = fixture.componentInstance;
    userService = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;

    userService.getUsers.and.returnValue(of(mockUsers));
    userService.deleteUsers.and.returnValue(of({
      status: 'success',
      data: {
        deletedCount: 1
      }
    }));
    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería cargar usuarios al iniciar', () => {
    expect(component.users.length).toBe(3);
    expect(component.filteredUsers.length).toBe(3);
  });

  it('debería filtrar usuarios por nombre o correo', () => {
    component.filterUsers('Juan');
    expect(component.filteredUsers.length).toBe(1);
    expect(component.filteredUsers[0].nombre).toBe('Juan');

    component.filterUsers('ana@test.com');
    expect(component.filteredUsers.length).toBe(1);
    expect(component.filteredUsers[0].nombre).toBe('Ana');
  });

  it('debería seleccionar y deseleccionar usuarios', () => {
    component.toggleSelect(1);
    expect(component.isSelected(1)).toBeTrue();
    component.toggleSelect(1);
    expect(component.isSelected(1)).toBeFalse();
  });

  it('debería seleccionar y deseleccionar todos', () => {
    component.toggleSelectAll();
    expect(component.itemsSelected.size).toBe(component.filteredUsers.length);

    component.toggleSelectAll();
    expect(component.itemsSelected.size).toBe(0);
  });

  it('debería eliminar usuarios seleccionados', () => {
    component.toggleSelect(1);
    component.toggleSelect(2);
    component.deleteItems();
    expect(userService.deleteUsers).toHaveBeenCalledWith([1, 2]);
  });

  it('debería abrir y cerrar modal', () => {
    component.openCreateModal();
    expect(component.isOpenModal).toBeTrue();

    component.closeModal();
    expect(component.isOpenModal).toBeFalse();
  });

  it('debería abrir y cerrar pop-up', () => {
    component.openPopUp();
    expect(component.isOpenPopUp).toBeTrue();

    component.closePopUp();
    expect(component.isOpenPopUp).toBeFalse();
  });
});
