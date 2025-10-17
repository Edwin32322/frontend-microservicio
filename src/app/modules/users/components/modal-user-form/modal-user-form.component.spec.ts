import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalUserFormComponent } from './modal-user-form.component';
import { UserService } from '../../services/user.service';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';
import { User } from '../../models/user.model';

describe('ModalUserFormComponent', () => {
  let component: ModalUserFormComponent;
  let fixture: ComponentFixture<ModalUserFormComponent>;
  let userService: jasmine.SpyObj<UserService>;

  const mockUser: User = { id: 1, nombre: 'Edwin', correo: 'edwin@test.com', edad: 25 };

  beforeEach(async () => {
    const userServiceSpy = jasmine.createSpyObj('UserService', ['createUser', 'updateUser']);

    await TestBed.configureTestingModule({
      imports: [ModalUserFormComponent, ReactiveFormsModule],
      providers: [
        FormBuilder,
        { provide: UserService, useValue: userServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ModalUserFormComponent);
    component = fixture.componentInstance;
    userService = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería inicializar formulario vacío si no hay usuario para actualizar', () => {
    fixture.detectChanges();
    expect(component.formGroup.value).toEqual({ name: '', email: '', age: '' });
  });

  it('debería prellenar formulario si hay usuario para actualizar', () => {
    component.userForUpdate = mockUser;
    fixture.detectChanges();
    expect(component.formGroup.value).toEqual({
      name: 'Edwin',
      email: 'edwin@test.com',
      age: '25'
    });
  });

  it('debería marcar campos como inválidos si son incorrectos', () => {
    fixture.detectChanges();
    component.formGroup.controls.name.setValue('Ed');
    component.formGroup.controls.email.setValue('correo_invalido');
    component.formGroup.controls.age.setValue("15");

    component.formGroup.markAllAsTouched();

    expect(component.isFieldInvalid('name')).toBeTrue();
    expect(component.isFieldInvalid('email')).toBeTrue();
    expect(component.isFieldInvalid('age')).toBeTrue();
  });

  it('debería llamar a createUser si es nuevo usuario', () => {
    fixture.detectChanges();
    component.formGroup.setValue({ name: 'Juan', email: 'juan@test.com', age: '28' });
    userService.createUser.and.returnValue(of(mockUser));

    spyOn(component, 'onClose');

    component.onSubmit();
    expect(userService.createUser).toHaveBeenCalledWith({ nombre: 'Juan', correo: 'juan@test.com', edad: 28 });
    expect(component.onClose).toHaveBeenCalled();
  });

  it('debería llamar a updateUser si hay usuario para actualizar', () => {
    component.userForUpdate = mockUser;
    fixture.detectChanges();
    component.formGroup.setValue({ name: 'Edwin Actualizado', email: 'edwin@test.com', age: '26' });
    userService.updateUser.and.returnValue(of({ ...mockUser, nombre: 'Edwin Actualizado', edad: 26 }));

    spyOn(component, 'onClose');

    component.onSubmit();
    expect(userService.updateUser).toHaveBeenCalledWith(1, { nombre: 'Edwin Actualizado', correo: 'edwin@test.com', edad: 26 });
    expect(component.onClose).toHaveBeenCalled();
  });

  it('debería emitir evento al cerrar modal', () => {
    spyOn(component.modalClosed, 'emit');
    component.onClose();
    expect(component.modalClosed.emit).toHaveBeenCalled();
  });

  it('debería mostrar alert en caso de error al guardar', () => {
    fixture.detectChanges();
    spyOn(window, 'alert');
    userService.createUser.and.returnValue(throwError(() => new Error('Error al guardar el usuario')));

    component.formGroup.setValue({ name: 'Juan', email: 'juan@test.com', age: '28' });
    component.onSubmit();

    expect(window.alert).toHaveBeenCalledWith('Error al guardar el usuario');
  });
});
