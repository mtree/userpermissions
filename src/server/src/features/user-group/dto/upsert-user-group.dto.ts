import { IsArray, IsDefined, IsNumber, IsString } from 'class-validator';
import { Permission } from 'src/features/permission/permission.entity';

export class UpsertUserGroupDto {
  id:string;

  @IsString()
  @IsDefined()
  name:string;

  @IsArray()
  @IsDefined()
  permissions: Permission[];

  @IsArray()
  @IsDefined()
  negativePermissions: Permission[];
}
