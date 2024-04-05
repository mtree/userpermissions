import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserGroupModifyPageComponent } from './user-group-modify-page.component';

describe('UserGroupModifyPageComponent', () => {
  let component: UserGroupModifyPageComponent;
  let fixture: ComponentFixture<UserGroupModifyPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserGroupModifyPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserGroupModifyPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
