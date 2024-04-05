import { Injectable } from "@angular/core";
import { IUser } from "../../../model/user";
import { upsertEntities } from "../helpers/functions";
import { IPermission } from "../../../model/permission";

/**
 * Tells us about permission origin.
 */
export enum PermissionStatus {
  User,
  UserGroup,
  Negative
}

export interface AdnotatedPermission extends IPermission {
  status: PermissionStatus;
}

@Injectable(
  { providedIn: 'root' }
)
export class UserService {
  getAdnotatedPermissions(user: IUser): Array<AdnotatedPermission> {
    let permissions: Array<AdnotatedPermission> = [];

    user.userGroups.forEach(
      userGroup => {
        userGroup.permissions.forEach(
          permission => {
            permissions = upsertEntities<AdnotatedPermission>(permissions, { ...permission, status: PermissionStatus.UserGroup });
          })
        }
      )

    user.permissions.forEach(permission => {
      permissions = upsertEntities<AdnotatedPermission>(permissions, { ...permission, status: PermissionStatus.User });
    });

    user.userGroups.forEach(
      userGroup => {
        userGroup.negativePermissions.forEach(
          permission => {
            permissions = upsertEntities<AdnotatedPermission>(permissions, { ...permission, status: PermissionStatus.Negative });
          })
        }
      )
    
    user.negativePermissions.forEach(permission => {
      permissions = upsertEntities<AdnotatedPermission>(permissions, { ...permission, status: PermissionStatus.Negative });
    });

    return permissions;
  }
}