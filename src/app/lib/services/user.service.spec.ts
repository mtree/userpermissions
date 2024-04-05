import { TestBed } from '@angular/core/testing';
import { UserService, PermissionStatus, AdnotatedPermission } from './user.service';
import { IUser } from '../../../model/user';

describe('UserService', () => {
  let userService: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserService]
    });
    userService = TestBed.inject(UserService);
  });

  it('should return an array of annotated permissions', () => {
    const user: IUser = {
      id: '1',
      name: 'John Doe',
      permissions: [
        { id: '1', name: 'Permission 1' },
        { id: '2', name: 'Permission 2' },
      ],
      negativePermissions: [],
      userGroups: []
    };

    const expectedPermissions: AdnotatedPermission[] = [
      { id: '1', name: 'Permission 1', status: PermissionStatus.User },
      { id: '2', name: 'Permission 2', status: PermissionStatus.User },
    ];

    const annotatedPermissions = userService.getAdnotatedPermissions(user);

    expect(annotatedPermissions).toEqual(expectedPermissions);
  });
});
