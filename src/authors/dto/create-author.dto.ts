import { IsString, IsOptional, IsDateString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateAuthorDto {
  @ApiProperty({ description: 'Полное имя автора' })
  @IsString()
  name: string; // Изменили с fullName на name

  @ApiPropertyOptional({ description: 'Дата рождения автора в формате ГГГГ-ММ-ДД' })
  @IsOptional()
  @IsDateString()
  birthDate?: string; // Изменили с dateBirth на birthDate
}