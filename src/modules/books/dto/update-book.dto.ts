import { IsDateString, IsInt, IsString, Min, Max, IsOptional } from 'class-validator';

export class UpdateBookDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsInt()
  @Min(1800)
  @Max(new Date().getFullYear())
  yearPublished?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  numberCopies?: number;

  @IsOptional()
  @IsInt()
  authorId?: number;

  @IsOptional()
  @IsDateString()
  dateReleaseBooks?: string;
}