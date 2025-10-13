import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent} from './app.component';
import { LayoutComponent } from './core/layout/layout.component';
import { RouterModule } from '@angular/router';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent, LayoutComponent, RouterModule.forRoot(
        [{path: '', component: AppComponent}, {path: 'layout', component: LayoutComponent}]
      )]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crearse el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería tener el título "frontend-microservicio"', () => {
    expect(component.title).toBe('frontend-microservicio');
  });
});
