import { ApiProperty } from "@nestjs/swagger";
import { Book } from "../../books/entities/book.entity";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";

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
