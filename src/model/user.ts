import { IEntity } from './entity';
import { IPermission } from './permission';
import { IUserGroup } from './user-group';

export interface IUser extends IEntity {
  permissions: IPermission[];
  negativePermissions: IPermission[];
  userGroups: IUserGroup[];
}
