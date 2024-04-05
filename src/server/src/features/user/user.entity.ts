import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';
import { IUser } from '../../../../model/user';
import { Permission } from '../permission/permission.entity';
import { UserGroup } from '../user-group/user-group.entity';

@Entity('users')
export class User implements IUser {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @ManyToMany(() => Permission)
  @JoinTable()
  permissions: Permission[];

  @ManyToMany(() => Permission)
  @JoinTable()
  negativePermissions: Permission[];

  @ManyToMany(() => UserGroup)
  @JoinTable()
  userGroups: UserGroup[];
}