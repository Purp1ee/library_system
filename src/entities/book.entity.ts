import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Author } from './author.entity';

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column('int')
  yearPublished: number;

  @Column('int')
  numberCopies: number;

  @ManyToOne(() => Author, (author) => author.books)
  author: Author;

  @Column('date')
  dateReleaseBooks: Date;
}