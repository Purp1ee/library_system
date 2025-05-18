import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Book } from './book.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Author {
  @ApiProperty({ description: 'Уникальный идентификатор автора' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'Имя автора' })
  @Column()
  name: string;

  @ApiProperty({
    description: 'Дата рождения автора',
    type: String,
    format: 'date',
    required: false,
    nullable: true,
  })
  @Column({ type: 'date', nullable: true })
  birthDate?: Date;

  @ApiProperty({
    description: 'Список книг автора',
    type: () => [Book],
  })
  @OneToMany(() => Book, (book) => book.author)
  books: Book[];
}