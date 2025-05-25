import { IsDateString, IsInt, IsString, Min, Max, IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateBookDto {
  @ApiPropertyOptional({ description: 'Название книги' })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiPropertyOptional({ description: 'Год публикации книги', minimum: 1800, maximum: new Date().getFullYear() })
  @IsOptional()
  @IsInt()
  @Min(1800)
  @Max(new Date().getFullYear())
  yearPublished?: string;

  @ApiPropertyOptional({ description: 'Количество экземпляров книги', minimum: 0 })
  @IsOptional()
  @IsInt()
  @Min(0)
  numberCopies?: number;

  @ApiPropertyOptional({ description: 'ID автора книги' })
  @IsOptional()
  @IsInt()
  authorId?: number;

  @ApiPropertyOptional({ description: 'Дата выпуска книги', type: String, format: 'date' })
  @IsOptional()
  @IsDateString()
  dateReleaseBooks?: string;
}