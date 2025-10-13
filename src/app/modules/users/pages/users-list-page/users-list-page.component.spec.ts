import { ComponentFixture, TestBed } from '@angular/core/testing';

import  UsersListPageComponent  from './users-list-page.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('UsersListPageComponent', () => {
  let component: UsersListPageComponent;
  let fixture: ComponentFixture<UsersListPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsersListPageComponent, HttpClientTestingModule]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UsersListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
