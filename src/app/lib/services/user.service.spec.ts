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

  it('should return an array of annotated permissions with user groups', () => {
    const user: IUser = {
      id: '1',
      name: 'John Doe',
      permissions: [],
      negativePermissions: [],
      userGroups: [
        {
          id: '1',
          name: 'Group 1',
          permissions: [
            { id: '1', name: 'Permission 1' },
            { id: '2', name: 'Permission 2' },
          ],
          negativePermissions: []
        }
      ]
    };

    const expectedPermissions: AdnotatedPermission[] = [
      { id: '1', name: 'Permission 1', status: PermissionStatus.UserGroup },
      { id: '2', name: 'Permission 2', status: PermissionStatus.UserGroup },
    ];

    const annotatedPermissions = userService.getAdnotatedPermissions(user);

    expect(annotatedPermissions).toEqual(expectedPermissions);
  });

  it('should return an array of annotated permissions with negative permissions', () => {
    const user: IUser = {
      id: '1',
      name: 'John Doe',
      permissions: [],
      negativePermissions: [
        { id: '1', name: 'Permission 1' },
        { id: '2', name: 'Permission 2' },
      ],
      userGroups: []
    };

    const expectedPermissions: AdnotatedPermission[] = [
      { id: '1', name: 'Permission 1', status: PermissionStatus.Negative },
      { id: '2', name: 'Permission 2', status: PermissionStatus.Negative },
    ];

    const annotatedPermissions = userService.getAdnotatedPermissions(user);

    expect(annotatedPermissions).toEqual(expectedPermissions);
  });

  it('should return an array of annotated permissions with negative permissions and user groups', () => {
    const user: IUser = {
      id: '1',
      name: 'John Doe',
      permissions: [],
      negativePermissions: [],
      userGroups: [
        {
          id: '1',
          name: 'Group 1',
          permissions: [],
          negativePermissions: [
            { id: '1', name: 'Permission 1' },
            { id: '2', name: 'Permission 2' },
          ]
        }
      ]
    };

    const expectedPermissions: AdnotatedPermission[] = [
      { id: '1', name: 'Permission 1', status: PermissionStatus.Negative },
      { id: '2', name: 'Permission 2', status: PermissionStatus.Negative },
    ];

    const annotatedPermissions = userService.getAdnotatedPermissions(user);

    expect(annotatedPermissions).toEqual(expectedPermissions);
  });

  it('should return an array of annotated permissions with deactivated permissions', () => {
    const user: IUser = {
      id: '1',
      name: 'John Doe',
      permissions: [
        { id: '1', name: 'Permission 1' },
        { id: '2', name: 'Permission 2' }
      ],
      negativePermissions: [
        { id: '1', name: 'Permission 1' },
        { id: '2', name: 'Permission 2' },
      ],
      userGroups: []
    };

    const expectedPermissions: AdnotatedPermission[] = [
      { id: '1', name: 'Permission 1', status: PermissionStatus.Deactivated },
      { id: '2', name: 'Permission 2', status: PermissionStatus.Deactivated },
    ];

    const annotatedPermissions = userService.getAdnotatedPermissions(user);

    expect(annotatedPermissions).toEqual(expectedPermissions);
  });

  it('should return an array of annotated permissions with user groups and deactivated permissions', () => {
    const user: IUser = {
      id: '1',
      name: 'John Doe',
      permissions: [],
      negativePermissions: [],
      userGroups: [
        {
          id: '1',
          name: 'Group 1',
          permissions: [
            { id: '2', name: 'Permission 2' }
          ],
          negativePermissions: [
            { id: '1', name: 'Permission 1' },
            { id: '2', name: 'Permission 2' }
          ]
        }
      ]
    };

    const expectedPermissions: AdnotatedPermission[] = [
      { id: '2', name: 'Permission 2', status: PermissionStatus.Deactivated },
      { id: '1', name: 'Permission 1', status: PermissionStatus.Negative },
    ];

    const annotatedPermissions = userService.getAdnotatedPermissions(user);

    expect(annotatedPermissions).toEqual(expectedPermissions);
  });

  it('should return an array of annotated permissions with user, user groups and deactivated permissions', () => {
    const user: IUser = {
      id: '1',
      name: 'John Doe',
      permissions: [
        { id: '1', name: 'Permission 1' },
        { id: '2', name: 'Permission 2' }
      ],
      negativePermissions: [],
      userGroups: [
        {
          id: '1',
          name: 'Group 1',
          permissions: [
          ],
          negativePermissions: [
            { id: '2', name: 'Permission 2' }
          ]
        }
      ]
    };

    const expectedPermissions: AdnotatedPermission[] = [
      { id: '1', name: 'Permission 1', status: PermissionStatus.User },
      { id: '2', name: 'Permission 2', status: PermissionStatus.Deactivated },
    ];

    const annotatedPermissions = userService.getAdnotatedPermissions(user);

    expect(annotatedPermissions).toEqual(expectedPermissions);
  });
});
