import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Permission } from './permission.entity';
import { Repository } from 'typeorm';
import { UpsertPermissionDto } from './dto/upsert-permission.dto';

@Injectable()
export class PermissionService {
  @InjectRepository(Permission)
  private readonly permissionRepository: Repository<Permission>;

  async findAll(): Promise<Array<Permission>> {
    return await this.permissionRepository.find();
  }

  async find(id: string): Promise<Permission> {
    return await this.permissionRepository.findOne({
      where: { id }
    });
  }

  async upsert(upsertPermissionDto: UpsertPermissionDto): Promise<any>{
    const { id, name } = upsertPermissionDto;

    const permission = new Permission();

    if (id) {
      permission.id = id;
    }
    permission.name = name;

    return await this.permissionRepository.save(permission);
  }

  async delete(id:  string): Promise<any>{
    return await this.permissionRepository.delete(id);
  }
}
