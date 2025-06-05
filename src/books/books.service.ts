import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

import { Author } from 'src/authors/entities/author.entity';
import { Book } from './entities/book.entity';

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
    const author = await this.authorRepository.findOne({ where: { id: dto.authorId } });
    if (!author) {
      throw new NotFoundException('Автор не найден');
    }

    const yearPublishedDate = isValidYear(dto.yearPublished)
      ? new Date(dto.yearPublished + '-01-01')
      : null;

    const releaseDate = dto.dateReleaseBooks && isValidDateString(dto.dateReleaseBooks)
      ? new Date(dto.dateReleaseBooks)
      : null;

    const book = this.bookRepository.create({
      title: dto.title,
      yearPublished: yearPublishedDate,
      numberCopies: dto.numberCopies,
      dateReleaseBooks: releaseDate,
      author,
    });

    return this.bookRepository.save(book);
  }

  async update(id: number, dto: UpdateBookDto): Promise<Book> {
    const book = await this.findOne(id);

    if (dto.authorId !== undefined) {
      const author = await this.authorRepository.findOne({ where: { id: dto.authorId } });
      if (!author) {
        throw new NotFoundException('Автор не найден');
      }
      book.author = author;
    }

    if (dto.title !== undefined) book.title = dto.title;

    if (dto.yearPublished !== undefined) {
      book.yearPublished = isValidYear(dto.yearPublished)
        ? new Date(dto.yearPublished + '-01-01')
        : null;
    }

    if (dto.numberCopies !== undefined) book.numberCopies = dto.numberCopies;

    if (dto.dateReleaseBooks !== undefined) {
      book.dateReleaseBooks = isValidDateString(dto.dateReleaseBooks)
        ? new Date(dto.dateReleaseBooks)
        : null;
    }

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

/**
 * Проверка валидности года, принимает string или number
 */
function isValidYear(year: any): boolean {
  if (typeof year === 'number') {
    return year >= 1800 && year <= new Date().getFullYear();
  }
  if (typeof year === 'string') {
    const num = parseInt(year, 10);
    return !isNaN(num) && num >= 1800 && num <= new Date().getFullYear();
  }
  return false;
}

/**
 * Проверка что строка валидная дата ISO-формата
 */
function isValidDateString(dateStr: any): boolean {
  if (typeof dateStr !== 'string') return false;
  const timestamp = Date.parse(dateStr);
  return !isNaN(timestamp);
}