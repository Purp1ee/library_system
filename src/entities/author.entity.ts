import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Book } from './book.entity';

@Entity()
export class Author {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fullName: string;

  @Column('date')
  dateBirth: Date;

  @OneToMany(() => Book, (book) => book.author)
  books: Book[];
}