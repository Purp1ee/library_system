import { IsDateString, IsString } from 'class-validator';

export class CreateAuthorDto {
  @IsString()
  fullName: string;

  @IsDateString()
  dateBirth: string;
}