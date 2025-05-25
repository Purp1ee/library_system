import { IsDateString, IsInt, IsString, Min, Max } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBookDto {
  @ApiProperty({ description: 'Название книги' })
  @IsString()
  title: string;

  @ApiProperty({ description: 'Год публикации книги', minimum: 1800, maximum: new Date().getFullYear() })
  @IsInt()
  @Min(1800)
  @Max(new Date().getFullYear())
  yearPublished: string;

  @ApiProperty({ description: 'Количество экземпляров книги', minimum: 0 })
  @IsInt()
  @Min(0)
  numberCopies: number;

  @ApiProperty({ description: 'ID автора книги' })
  @IsInt()
  authorId: number;

  @ApiProperty({ description: 'Дата выпуска книги', type: String, format: 'date' })
  @IsDateString()
  dateReleaseBooks: string;
}