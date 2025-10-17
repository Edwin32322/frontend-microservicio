import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { User } from '../../models/user.model';
import { NgClass, NgIf } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-modal-user-form',
  standalone: true,
  imports: [NgClass, NgIf, ReactiveFormsModule],
  templateUrl: './modal-user-form.component.html',
  styleUrl: './modal-user-form.component.scss'
})
export class ModalUserFormComponent implements OnInit {
  @Input() userForUpdate?: User;
  @Output() modalClosed = new EventEmitter<void>();

  private userService = inject(UserService);
  private formBuilder = inject(FormBuilder);
  
  formGroup = this.formBuilder.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    age: ['', [Validators.required, Validators.min(18),Validators.max(120)]],
  });
  
  ngOnInit(): void {
    if (this.userForUpdate) {
      this.formGroup.patchValue({
        name: this.userForUpdate.nombre,
        email: this.userForUpdate.correo,
        age: this.userForUpdate.edad.toString()
      });
    }
  }
    
  isFieldInvalid(field: string): boolean {
    const control = this.formGroup.get(field);
    return !!(control?.invalid && control?.touched);
  }
    
  onSubmit(): void {
    if (this.formGroup.valid) {
      const payload = {
        nombre: this.formGroup.controls.name.value,
        correo: this.formGroup.controls.email.value,
        edad: Number(this.formGroup.controls.age.value)
      };
      
      const request$ = this.userForUpdate 
        ? this.userService.updateUser(this.userForUpdate.id, payload)
        : this.userService.createUser(payload);
      
      request$.subscribe({
        next: () => {
          this.onClose(); 
        },
        error: (error) => {
          console.error('Error guardando usuario:', error.message);
          alert(error?.error?.message || error?.mesagge || "Error al guardar el usuario");
        }
      });
      
    } else {
      Object.keys(this.formGroup.controls).forEach(key => {
        this.formGroup.get(key)!.markAsTouched();
      });
    }
  }

  onClose() {
    this.modalClosed.emit();
  }
}