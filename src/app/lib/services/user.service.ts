import { Injectable } from "@angular/core";
import { IUser } from "../../../model/user";
import { upsertEntity } from "../helpers/functions";
import { IPermission } from "../../../model/permission";

/**
 * Tells us about permission origin.
 */
export enum PermissionStatus {
  User,
  UserGroup,
  Negative,
  Deactivated
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
            permissions = upsertEntity<AdnotatedPermission>(permissions, { ...permission, status: PermissionStatus.UserGroup });
          })
        }
      )

    user.permissions.forEach(permission => {
      permissions = upsertEntity<AdnotatedPermission>(permissions, { ...permission, status: PermissionStatus.User });
    });

    user.userGroups.forEach(
      userGroup => {
        userGroup.negativePermissions.forEach(
          permission => {
            permissions = upsertEntity<AdnotatedPermission>(
              permissions,
              { ...permission, status: PermissionStatus.Negative },
              { status: PermissionStatus.Deactivated }
            );
          })
        }
      )
    
    user.negativePermissions.forEach(permission => {
      permissions = upsertEntity<AdnotatedPermission>(
        permissions, 
        { ...permission, status: PermissionStatus.Negative },
        { status: PermissionStatus.Deactivated }
      );
    });

    return permissions;
  }
}