import { IsString, IsOptional, IsDateString } from 'class-validator';

export class CreateAuthorDto {
  @IsString()
  fullName: string;

  @IsOptional()
  @IsDateString()
  dateBirth?: string;
}