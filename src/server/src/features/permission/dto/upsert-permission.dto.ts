import { IsString } from 'class-validator';

export class UpsertPermissionDto {
  @IsString()
  name:string;
}
