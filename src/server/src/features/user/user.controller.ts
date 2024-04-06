import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { UpsertUserDto } from './dto/upsert-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll(): Promise<Array<User>> {
    return this.userService.findAll();
  }

  @Get(':id')
  find(@Param('id') id: string): Promise<User> {
    return this.userService.find(id);
  }

  @Post()
  upsert(@Body() upsertUserDto: UpsertUserDto) {
    return this.userService.upsert(upsertUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.delete(id);
  }
}
