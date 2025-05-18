import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from '../../entities/book.entity';
import { Author } from '../../entities/author.entity';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private bookRepository: Repository<Book>,

    @InjectRepository(Author)
    private authorRepository: Repository<Author>,
  ) {}

  async findAll(): Promise<Book[]> {
    return this.bookRepository.find({ relations: ['author'] });
  }

  async findOne(id: number): Promise<Book> {
    const book = await this.bookRepository.findOne({
      where: { id },
      relations: ['author'],
    });
    if (!book) {
      throw new NotFoundException(`Книга с id=${id} не найдена`);
    }
    return book;
  }

  async create(dto: CreateBookDto): Promise<Book> {
    const author = await this.authorRepository.findOne({
      where: { id: dto.authorId },
    });
    if (!author) {
      throw new NotFoundException('Автор не найден');
    }

    const book = this.bookRepository.create({
      title: dto.title,
      yearPublished: dto.yearPublished,
      numberCopies: dto.numberCopies,
      dateReleaseBooks: new Date(dto.dateReleaseBooks),
      author,
    });

    return this.bookRepository.save(book);
  }

  async update(id: number, dto: UpdateBookDto): Promise<Book> {
    const book = await this.findOne(id);

    if (dto.authorId !== undefined) {
      const author = await this.authorRepository.findOne({
        where: { id: dto.authorId },
      });
      if (!author) {
        throw new NotFoundException('Автор не найден');
      }
      book.author = author;
    }

    if (dto.title !== undefined) book.title = dto.title;
    if (dto.yearPublished !== undefined) book.yearPublished = dto.yearPublished;
    if (dto.numberCopies !== undefined) book.numberCopies = dto.numberCopies;
    if (dto.dateReleaseBooks !== undefined)
      book.dateReleaseBooks = new Date(dto.dateReleaseBooks);

    return this.bookRepository.save(book);
  }

  async remove(id: number): Promise<void> {
    try {
      await this.bookRepository.delete(id);
    } catch (error) {
      throw new BadRequestException('Невозможно удалить книгу');
    }
  }
}