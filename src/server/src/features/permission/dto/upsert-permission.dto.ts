import { IsString } from 'class-validator';

export class UpsertPermissionDto {
  id: string
  
  @IsString()
  name: string;
}
