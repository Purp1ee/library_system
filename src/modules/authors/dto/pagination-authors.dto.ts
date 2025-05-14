import { IsOptional, IsPositive } from 'class-validator';

export class PaginationAuthorsDto {
  @IsOptional()
  @IsPositive()
  limit: number = 10;

  @IsOptional()
  @IsPositive()
  offset: number = 0;
}