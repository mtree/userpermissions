import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PermissionsDisplayComponent } from './permissions-display.component';
import { CommonModule } from '@angular/common';
import { UserService } from '../../../lib/services/user.service';

describe('PermissionsDisplayComponent', () => {
  let component: PermissionsDisplayComponent;
  let fixture: ComponentFixture<PermissionsDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule],
      providers: [UserService]
    }).compileComponents();

    fixture = TestBed.createComponent(PermissionsDisplayComponent);
    component = fixture.componentInstance;

    component.user = {
      id: '',
      name: '',
      permissions: [],
      negativePermissions: [],
      userGroups: []
    };

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('should have correct permissions', () => {
  //   const user: IUser = {
  //   };
  //   component.user = user;
  //   fixture.detectChanges();

  //   expect(component.permissions).toEqual([
  //   ]);
  // });
});
