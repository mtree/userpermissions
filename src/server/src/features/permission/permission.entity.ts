import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { IPermission } from '../../../../model/permission';

@Entity('permissions')
export class Permission implements IPermission {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;
}
