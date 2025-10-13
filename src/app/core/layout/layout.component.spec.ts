import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutComponent } from './layout.component';
import { RouterModule } from '@angular/router';
import { HomeComponent } from '../../modules/home/pages/home/home.component';
import UsersListPageComponent from '../../modules/users/pages/users-list-page/users-list-page.component';

describe('LayoutComponent', () => {
  let component: LayoutComponent;
  let fixture: ComponentFixture<LayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LayoutComponent, RouterModule.forRoot(
        [{path: 'home', component: HomeComponent }, {path: 'users/list', component: UsersListPageComponent}]
      )]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
