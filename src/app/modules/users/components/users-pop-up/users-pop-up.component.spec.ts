import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UsersPopUpComponent } from './users-pop-up.component';

describe('UsersPopUpComponent', () => {
  let component: UsersPopUpComponent;
  let fixture: ComponentFixture<UsersPopUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsersPopUpComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(UsersPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crearse el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería emitir onDelete y onClose cuando se llama confirmDelete()', () => {
    spyOn(component.onDelete, 'emit');
    spyOn(component.onClose, 'emit');

    component.confirmDelete();

    expect(component.onDelete.emit).toHaveBeenCalled();
    expect(component.onClose.emit).toHaveBeenCalled();
  });

  it('debería emitir onClose cuando se llama closePopUp()', () => {
    spyOn(component.onClose, 'emit');

    component.closePopUp();

    expect(component.onClose.emit).toHaveBeenCalled();
  });
});
