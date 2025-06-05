import { ApiProperty } from "@nestjs/swagger";
import { Author } from "../../authors/entities/author.entity";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";

@Entity()
export class Book {
  @ApiProperty({ description: 'Уникальный идентификатор книги' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'Название книги' })
  @Column()
  title: string;

  @ApiProperty({ description: 'Год публикации книги', minimum: 1800, maximum: new Date().getFullYear() })
  @Column({ type: 'date', nullable: true })
  yearPublished: Date | null;

  @ApiProperty({ description: 'Количество экземпляров книги', minimum: 0 })
  @Column()
  numberCopies: number;

  @ApiProperty({ description: 'Дата выпуска книги', type: String, format: 'date' })
  @Column({ type: 'date', nullable: true })
  dateReleaseBooks: Date | null;

  @ApiProperty({ description: 'Автор книги', type: () => Author })
  @ManyToOne(() => Author, (author) => author.books, { eager: true })
  author: Author;
}