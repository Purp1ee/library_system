import { IsDateString, IsString, IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateAuthorDto {
  @ApiPropertyOptional({ description: 'Полное имя автора' })
  @IsOptional()
  @IsString()
  name?: string; // Изменили с fullName на name

  @ApiPropertyOptional({ description: 'Дата рождения автора в формате ГГГГ-ММ-ДД' })
  @IsOptional()
  @IsDateString()
  birthDate?: string; // Изменили с dateBirth на birthDate
}