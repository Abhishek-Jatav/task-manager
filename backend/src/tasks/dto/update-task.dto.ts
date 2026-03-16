import { IsOptional, IsString, IsBoolean } from 'class-validator';

export class UpdateTaskDto {

  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsBoolean()
  status?: boolean;

}