import { IsDateString, IsInt, IsString, Min, Max } from 'class-validator';

export class CreateBookDto {
  @IsString()
  title: string;

  @IsInt()
  @Min(1800)
  @Max(new Date().getFullYear())
  yearPublished: number;

  @IsInt()
  @Min(0)
  numberCopies: number;

  @IsInt()
  authorId: number;

  @IsDateString()
  dateReleaseBooks: string;
}