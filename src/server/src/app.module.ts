import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './features/user/user.module';
import { PermissionModule } from './features/permission/permission.module';
import { UserGroupModule } from './features/user-group/user-group.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Permission } from './features/permission/permission.entity';
import { User } from './features/user/user.entity';
import { UserGroup } from './features/user-group/user-group.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [Permission, User, UserGroup],
      synchronize: true,
    }),
    UserModule, 
    PermissionModule, 
    UserGroupModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
