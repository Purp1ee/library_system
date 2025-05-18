import { IsString, IsOptional, IsDateString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateAuthorDto {
  @ApiProperty({ description: 'Полное имя автора' })
  @IsString()
  fullName: string;

  @ApiPropertyOptional({ description: 'Дата рождения автора в формате ГГГГ-ММ-ДД' })
  @IsOptional()
  @IsDateString()
  dateBirth?: string;
}