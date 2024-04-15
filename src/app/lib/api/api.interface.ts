import { Observable } from 'rxjs';
import { IUser } from '../../../model/user';
import { IUserGroup } from '../../../model/user-group';
import { IPermission } from '../../../model/permission';
import { ListResponse } from '../../../model/api/list-response';
import { EntityResponse } from '../../../model/api/entity.response';

export interface IApiService {
  getUsers(): Observable<ListResponse<IUser>>;
  getUser(id: string): Observable<EntityResponse<IUser>>;
  deleteUser(id: string): Observable<ListResponse<IUser>>;
  upsertUser(user: IUser): Observable<EntityResponse<IUser>>;

  getUserGroups(): Observable<ListResponse<IUserGroup>>;
  getUserGroup(id: string): Observable<EntityResponse<IUserGroup>>;
  deleteUserGroup(id: string): Observable<ListResponse<IUserGroup>>;
  upsertUserGroup(userGroup: IUserGroup): Observable<EntityResponse<IUserGroup>>;

  getPermissions(): Observable<ListResponse<IPermission>>;
  getPermission(id: string): Observable<EntityResponse<IPermission>>;
  deletePermission(id: string): Observable<ListResponse<IPermission>>;
  upsertPermission(permission: IPermission): Observable<EntityResponse<IPermission>>;
}
