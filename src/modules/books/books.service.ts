import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from '../../entities/book.entity';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { AuthorsService } from '../authors/authors.service';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private booksRepository: Repository<Book>,
    private authorsService: AuthorsService,
  ) {}

  async findAll(): Promise<Book[]> {
    return this.booksRepository.find({ relations: ['author'] });
  }

  async findOne(id: number): Promise<Book> {
    const book = await this.booksRepository.findOne({
      where: { id },
      relations: ['author'],
    });
    if (!book) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }
    return book;
  }

  async create(createBookDto: CreateBookDto): Promise<Book> {
    const author = await this.authorsService.findOne(createBookDto.authorId);
    const book = this.booksRepository.create({
      title: createBookDto.title,
      yearPublished: createBookDto.yearPublished,
      numberCopies: createBookDto.numberCopies,
      dateReleaseBooks: new Date(createBookDto.dateReleaseBooks),
      author,
    });
    return this.booksRepository.save(book);
  }

  async update(id: number, updateBookDto: UpdateBookDto): Promise<Book> {
    const book = await this.findOne(id);
    
    if (updateBookDto.authorId) {
      const author = await this.authorsService.findOne(updateBookDto.authorId);
      book.author = author;
    }

    if (updateBookDto.title) book.title = updateBookDto.title;
    if (updateBookDto.yearPublished) book.yearPublished = updateBookDto.yearPublished;
    if (updateBookDto.numberCopies) book.numberCopies = updateBookDto.numberCopies;
    if (updateBookDto.dateReleaseBooks) book.dateReleaseBooks = new Date(updateBookDto.dateReleaseBooks);

    return this.booksRepository.save(book);
  }

  async remove(id: number): Promise<void> {
    const book = await this.findOne(id);
    await this.booksRepository.remove(book);
  }
}