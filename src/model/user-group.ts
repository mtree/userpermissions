import { IEntity } from './entity';
import { IPermission } from './permission';

export interface IUserGroup extends IEntity {
  permissions: IPermission[];
  negativePermissions: IPermission[];
}
