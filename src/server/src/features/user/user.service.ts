import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { In, Repository } from 'typeorm';
import { UserGroup } from '../user-group/user-group.entity';
import { Permission } from '../permission/permission.entity';
import { UpsertUserDto } from './dto/upsert-user.dto';

@Injectable()
export class UserService {
  @InjectRepository(User)
  private readonly userRepository: Repository<User>;
  @InjectRepository(UserGroup)
  private readonly userGroupRepository: Repository<UserGroup>;
  @InjectRepository(Permission)
  private readonly permissionRepository: Repository<Permission>;

  async findAll(): Promise<Array<User>> {
    return await this.userRepository.find({ relations: ['userGroups', 'userGroups.permissions', 'userGroups.negativePermissions', 'permissions', 'negativePermissions'] });
  }

  async find(id: string): Promise<User> {
    return await this.userRepository.findOne({
      where: { id },
      relations: ['userGroups', 'permissions', 'negativePermissions']
    });
  }

  async upsert(upsertUserDto: UpsertUserDto): Promise<any> {
    const { id, name, userGroups, permissions, negativePermissions } = upsertUserDto;

    const user = new User();
    if (id) {
      user.id = id;
    }
    user.name = name;

    // Find or create the userGroups
    const userGroupEntities = await Promise.all(
      userGroups.map(async (ug) => {
        let userGroup: UserGroup = await this.userGroupRepository.findOneBy({
          id: ug.id
        });

        if (!userGroup) {
          userGroup = new UserGroup();
          userGroup.id = ug.id;
          userGroup.name = ug.name;
          userGroup.permissions = ug.permissions;
          userGroup.negativePermissions = ug.negativePermissions;

          return await this.userGroupRepository.save(userGroup, { });
        }

        return userGroup;
      })
    );

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

          return await this.permissionRepository.save(permission, { });
        }

        return permission;
      })
    );

    user.userGroups = userGroupEntities;
    user.permissions = permissionEntities;
    user.negativePermissions = negativePermissionEntities;

    return await this.userRepository.save(user, { });
  }

  async delete(id: string): Promise<any> {
    return await this.userRepository.delete(id);
  }
}
