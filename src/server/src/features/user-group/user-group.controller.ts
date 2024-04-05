import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { UserGroupService } from './user-group.service';
import { UserGroup } from './user-group.entity';
import { UpsertUserGroupDto } from './dto/user-group.dto';

@Controller('user-group')
export class UserGroupController {
  constructor(private readonly userGroupService: UserGroupService) {}

  @Get()
  findAll(): Promise<Array<UserGroup>> {
    return this.userGroupService.findAll();
  }

  @Post()
  upsert(@Body() upsertPermissionDto: UpsertUserGroupDto) {
    return this.userGroupService.upsert(upsertPermissionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userGroupService.delete(id);
  }
}
