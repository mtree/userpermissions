import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserGroup } from '../user-group/user-group.entity';
import { Permission } from '../permission/permission.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([UserGroup]),
    TypeOrmModule.forFeature([Permission])
  ],
  providers: [UserService],
  controllers: [UserController]
})
export class UserModule {}
