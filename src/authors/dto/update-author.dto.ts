import { IsDateString, IsString, IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateAuthorDto {
  @ApiPropertyOptional({ description: 'Полное имя автора' })
  @IsOptional()
  @IsString()
  fullName?: string;

  @ApiPropertyOptional({ description: 'Дата рождения автора в формате ГГГГ-ММ-ДД' })
  @IsOptional()
  @IsDateString()
  dateBirth?: string;
}