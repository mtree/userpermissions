import { Observable, tap } from 'rxjs';
import { IPermission } from '../../../model/permission';
import { IUser } from '../../../model/user';
import { IUserGroup } from '../../../model/user-group';
import { IApiService } from './api.interface';
import { ListResponse } from '../../../model/api/list-response';
import { EntityResponse } from '../../../model/api/entity.response';
import { of } from 'rxjs';

export class MockApiService implements IApiService {
  getUsers(): Observable<ListResponse<IUser>> {
    const users: IUser[] = [
      { 
        id: '1', 
        name: 'John Doe', 
        permissions: [{ id: '1', name: 'foo' }], 
        negativePermissions: [], 
        userGroups: [
          { id: '1', name: 'foo', permissions: [{ id: '1', name: 'foo' }, { id: '2', name: 'bar'}], negativePermissions: [] }
        ]
      },
      { id: '2', name: 'Jane Smith', permissions: [], negativePermissions: [{ id: '1', name: 'foo' }], userGroups: [] },
      { id: '3', name: 'Bob Johnson', permissions: [], negativePermissions: [], userGroups: [] }
    ];
    const response: ListResponse<IUser> = {
      data: users
    };
    
    return of(response);
  }

  getUser(id: string): Observable<EntityResponse<IUser>> {
    return of({ data: { id: '1', name: 'John Doe', permissions: [{ id: '1', name: 'foo' }], negativePermissions: [{ id: '1', name: 'foo' }], userGroups: [{ id: '2', name: 'bar', permissions: [], negativePermissions: [] }] }});
  }

  deleteUser(id: string): Observable<ListResponse<IUser>> {
    const users: IUser[] = [
      { id: '1', name: 'John Doe', permissions: [{ id: '1', name: 'foo' }], negativePermissions: [], userGroups: []},
      { id: '2', name: 'Jane Smith', permissions: [], negativePermissions: [{ id: '1', name: 'foo' }], userGroups: [] },
      { id: '3', name: 'Bob Johnson', permissions: [], negativePermissions: [], userGroups: [] }
    ];
    const response: ListResponse<IUser> = {
      data: users
    };
    
    return of(response);
  }

  upsertUser(user: IUser): Observable<EntityResponse<IUser>> {
    return of({ data: { id: '1', name: 'John Doe', permissions: [{ id: '1', name: 'foo' }], negativePermissions: [], userGroups: [] }});
  }

  getUserGroups(): Observable<ListResponse<IUserGroup>> {
    return of({ data: [
      { id: '1', name: 'foo', permissions: [], negativePermissions: [] },
      { id: '2', name: 'bar', permissions: [{ id: '1', name: 'foo' }], negativePermissions: [] },
      { id: '3', name: 'baz', permissions: [], negativePermissions: [] },
    ]});
  }

  getUserGroup(id: string): Observable<EntityResponse<IUserGroup>> {
    return of({ data: { id: '1', name: 'foo', permissions: [{ id: '1', name: 'foo' }], negativePermissions: [{ id: '1', name: 'foo' }] }});
  }

  deleteUserGroup(id: string): Observable<ListResponse<IUserGroup>> {
    throw new Error('Method not implemented.');
  }

  upsertUserGroup(userGroup: IUserGroup): Observable<EntityResponse<IUserGroup>> {
    return of({ data: { id: '1', name: 'foo', permissions: [{ id: '1', name: 'foo' }], negativePermissions: [] }});
  }

  getPermissions(): Observable<ListResponse<IPermission>> {
    return of({ data: [
      { id: '1', name: 'foo' },
      { id: '2', name: 'bar' },
      { id: '3', name: 'baz' },
      { id: '4', name: 'qux' }
    ]});
  }

  getPermission(id: string): Observable<EntityResponse<IPermission>> {
    return of({ data: { id: '1', name: 'foo' }});
  }

  upsertPermission(permission: IPermission): Observable<EntityResponse<IPermission>> {
    throw new Error('Method not implemented.');
  }

  deletePermission(id: string): Observable<ListResponse<IPermission>> {
    throw new Error('Method not implemented.');
  }
}
