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

  async upsert(upsertPermissionDto: UpsertPermissionDto): Promise<any>{
    return await this.permissionRepository.upsert(upsertPermissionDto, ['id']);
  }

  async delete(id:  string): Promise<any>{
    return await this.permissionRepository.delete(id);
  }
}
