import { Observable } from 'rxjs';
import { IApiService } from './api.interface';
import { ListResponse } from '../../../model/api/list-response';
import { EntityResponse } from '../../../model/api/entity.response';
import { IUser } from '../../../model/user';
import { HttpClient } from '@angular/common/http';
import { IUserGroup } from '../../../model/user-group';
import { IPermission } from '../../../model/permission';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService implements IApiService {
  constructor(private http: HttpClient) {}

  getUsers(): Observable<ListResponse<IUser>> {
    return this.http.get<ListResponse<IUser>>('/api/user');
  }

  getUser(id: string): Observable<EntityResponse<IUser>> {
    return this.http.get<EntityResponse<IUser>>(`/api/user/${id}`);
  }

  deleteUser(id: string): Observable<ListResponse<IUser>> {
    return this.http.delete<ListResponse<IUser>>(`/api/user/${id}`);
  }

  upsertUser(user: IUser): Observable<EntityResponse<IUser>> {
    return this.http.post<EntityResponse<IUser>>('/api/user', user);
  }

  getUserGroups(): Observable<ListResponse<IUserGroup>> {
    return this.http.get<ListResponse<IUserGroup>>('/api/user-group');
  }

  getUserGroup(id: string): Observable<EntityResponse<IUserGroup>> {
    return this.http.get<EntityResponse<IUserGroup>>(`/api/user-group/${id}`);
  }

  deleteUserGroup(id: string): Observable<ListResponse<IUserGroup>> {
    return this.http.delete<ListResponse<IUserGroup>>(`/api/user-group/${id}`);
  }

  upsertUserGroup(userGroup: IUserGroup): Observable<EntityResponse<IUserGroup>> {
    return this.http.post<EntityResponse<IUserGroup>>('/api/user-group', userGroup);
  }

  getPermissions(): Observable<ListResponse<IUserGroup>> {
    return this.http.get<ListResponse<IUserGroup>>('/api/permission');
  }

  getPermission(id: string): Observable<EntityResponse<IPermission>> {
    return this.http.get<EntityResponse<IPermission>>(`/api/permission/${id}`);
  }

  deletePermission(id: string): Observable<ListResponse<IPermission>> {
    return this.http.delete<ListResponse<IPermission>>(`/api/permission/${id}`);
  }

  upsertPermission(permission: IPermission): Observable<EntityResponse<IPermission>> {
    return this.http.post<EntityResponse<IPermission>>('/api/permission', permission);
  }
}
