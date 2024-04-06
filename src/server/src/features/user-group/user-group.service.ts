import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserGroup } from './user-group.entity';
import { Repository } from 'typeorm';
import { UpsertUserGroupDto } from './dto/upsert-user-group.dto';
import { Permission } from '../permission/permission.entity';

@Injectable()
export class UserGroupService {
  @InjectRepository(UserGroup)
  private readonly userGroupRepository: Repository<UserGroup>;
  @InjectRepository(Permission)
  private readonly permissionRepository: Repository<Permission>;

  async findAll(): Promise<Array<UserGroup>> {
    return await this.userGroupRepository.find({ relations: ['permissions', 'negativePermissions'] });
  }

  async find(id: string): Promise<UserGroup> {
    return await this.userGroupRepository.findOne({
      where: { id },
      relations: ['permissions', 'negativePermissions']
    });
  }

  async upsert(upsertUserGroupDto: UpsertUserGroupDto): Promise<any>{
    const { id, name, permissions, negativePermissions } = upsertUserGroupDto;

    const userGroup = new UserGroup();
    if (id) {
      userGroup.id = id;
    }
    userGroup.name = name;

    // Find or create the permissions
    const permissionEntities = await Promise.all(
      permissions.map(async (p) => {
        let permission: Permission = await this.permissionRepository.findOneBy({
          id: p.id
        });

        if (!permission) {
          permission = new Permission();
          permission.id = p.id;
          permission.name = p.name;

          return await this.permissionRepository.save(permission, { });
        }

        return permission;
      })
    );

    const negativePermissionEntities = await Promise.all(
      negativePermissions.map(async (p) => {
        let permission: Permission = await this.permissionRepository.findOneBy({
          id: p.id
        });

        if (!permission) {
          permission = new Permission();
          permission.id = p.id;
          permission.name = p.name;

          return await this.permissionRepository.save(permission);
        }

        return permission;
      })
    );

    // Assign  permissions to the user group
    userGroup.permissions = permissionEntities;
    userGroup.negativePermissions = negativePermissionEntities;

    // Save the user group entity
    return await this.userGroupRepository.save(userGroup);
  }

  async delete(id:  string): Promise<any>{
    return await this.userGroupRepository.delete(id);
  }
}
