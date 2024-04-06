import { IsArray, IsDefined, IsString } from "class-validator";
import { Permission } from "src/features/permission/permission.entity";
import { UserGroup } from "src/features/user-group/user-group.entity";

export class UpsertUserDto {
  id: string;

  @IsString()
  @IsDefined()
  name: string;

  @IsArray()
  @IsDefined()
  userGroups: UserGroup[];

  @IsArray()
  @IsDefined()
  permissions: Permission[];

  @IsArray()
  @IsDefined()
  negativePermissions: Permission[];
}