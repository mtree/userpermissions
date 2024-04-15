import { IPermission } from '../../../model/permission';
import { IUser } from '../../../model/user';
import { IUserGroup } from '../../../model/user-group';

export abstract class FormComponent<T extends IUser | IPermission | IUserGroup> {
  /**
   * Method to compare two business entities
   * @param option
   * @param value
   * @returns
   */
  entityComparisonFunction(option: T, value: T): boolean {
    return option.id === value.id;
  }
}
