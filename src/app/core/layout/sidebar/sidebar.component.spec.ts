import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarComponent } from './sidebar.component';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { of } from 'rxjs';
import { HomeComponent } from '../../../modules/home/pages/home/home.component';
import UsersListPageComponent from '../../../modules/users/pages/users-list-page/users-list-page.component';

describe('SidebarComponent', () => {
  let component: SidebarComponent;
  let fixture: ComponentFixture<SidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidebarComponent, RouterModule.forRoot(
          [{path: 'home', component: HomeComponent }, {path: 'users/list', component: UsersListPageComponent}]
      )],
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
