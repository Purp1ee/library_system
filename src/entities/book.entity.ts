import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Author } from './author.entity';

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  yearPublished: number;

  @Column()
  numberCopies: number;

  @Column({ type: 'date' })
  dateReleaseBooks: Date;

  @ManyToOne(() => Author, (author) => author.books, { eager: true })
  author: Author;
}