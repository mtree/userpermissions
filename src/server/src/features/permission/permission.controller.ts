import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { PermissionService } from './permission.service';
import { UpsertPermissionDto } from './dto/upsert-permission.dto';
import { Permission } from './permission.entity';

@Controller('permission')
export class PermissionController {
  constructor(private readonly permissionService: PermissionService) {}

  @Get()
  findAll(): Promise<Array<Permission>> {
    return this.permissionService.findAll();
  }

  @Post()
  upsert(@Body() upsertPermissionDto: UpsertPermissionDto) {
    return this.permissionService.upsert(upsertPermissionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.permissionService.delete(id);
  }
}
