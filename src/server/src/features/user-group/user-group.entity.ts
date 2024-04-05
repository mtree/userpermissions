import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';
import { IUserGroup } from '../../../../model/user-group';
import { Permission } from '../permission/permission.entity';

@Entity('userGroups')
export class UserGroup implements IUserGroup {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @ManyToMany(() => Permission, {
    cascade: true,
  })
  @JoinTable()
  permissions: Permission[];

  @ManyToMany(() => Permission, {
    cascade: true,
  })
  @JoinTable()
  negativePermissions: Permission[];
}
