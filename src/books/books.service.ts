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

    // Улучшенная обработка дат с более детальными ошибками
    const yearPublishedDate = this.parseYearPublished(dto.yearPublished);
    const releaseDate = this.parseReleaseDate(dto.dateReleaseBooks);

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

    if (dto.title !== undefined) {
      book.title = dto.title;
    }

    if (dto.yearPublished !== undefined) {
      book.yearPublished = this.parseYearPublished(dto.yearPublished);
    }

    if (dto.numberCopies !== undefined) {
      book.numberCopies = dto.numberCopies;
    }

    if (dto.dateReleaseBooks !== undefined) {
      book.dateReleaseBooks = this.parseReleaseDate(dto.dateReleaseBooks);
    }

    return this.bookRepository.save(book);
  }

  async remove(id: number): Promise<void> {
    const result = await this.bookRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Книга с id=${id} не найдена`);
    }
  }

  // Вынесенные методы для обработки дат

  private parseYearPublished(year: string | number | null | undefined): Date | null {
    if (year === null || year === undefined || year === '') {
      return null;
    }

    if (!isValidYear(year)) {
      throw new BadRequestException(
        `Неверный год публикации: ${year}. Год должен быть между 1800 и ${new Date().getFullYear()}`,
      );
    }

    const yearNumber = typeof year === 'string' ? parseInt(year, 10) : year;
    return new Date(`${yearNumber}-01-01`);
  }

  private parseReleaseDate(dateStr: string | null | undefined): Date | null {
    if (dateStr === null || dateStr === undefined || dateStr === '') {
      return null;
    }

    if (!isValidDateString(dateStr)) {
      throw new BadRequestException(
        `Неверный формат даты выпуска: ${dateStr}. Используйте формат YYYY-MM-DD`,
      );
    }

    return new Date(dateStr);
  }
}

// Валидационные функции

function isValidYear(year: any): boolean {
  if (year === null || year === undefined) return false;
  
  const currentYear = new Date().getFullYear();
  let yearNumber: number;

  if (typeof year === 'number') {
    yearNumber = year;
  } else if (typeof year === 'string') {
    yearNumber = parseInt(year, 10);
    if (isNaN(yearNumber)) return false;
  } else {
    return false;
  }

  return yearNumber >= 1800 && yearNumber <= currentYear;
}

function isValidDateString(dateStr: any): boolean {
  if (typeof dateStr !== 'string' || dateStr.trim() === '') return false;
  
  // Проверяем формат YYYY-MM-DD
  if (!/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) return false;
  
  const date = new Date(dateStr);
  return !isNaN(date.getTime()) && date.toISOString().slice(0, 10) === dateStr;
}
