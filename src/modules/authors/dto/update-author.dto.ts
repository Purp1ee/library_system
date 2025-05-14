import { IsDateString, IsString, IsOptional } from 'class-validator';

export class UpdateAuthorDto {
  @IsOptional()
  @IsString()
  fullName?: string;

  @IsOptional()
  @IsDateString()
  dateBirth?: string;
}