import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { BooksService } from './books.service';
import { Book } from '../../entities/book.entity';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';

@ApiTags('books')
@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  @ApiOperation({ summary: 'Получить список всех книг' })
  @ApiResponse({ status: 200, description: 'Массив книг', type: [Book] })
  findAll(): Promise<Book[]> {
    return this.booksService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Получить книгу по ID' })
  @ApiParam({ name: 'id', description: 'ID книги', type: Number })
  @ApiResponse({ status: 200, description: 'Книга найдена', type: Book })
  findOne(@Param('id') id: string): Promise<Book> {
    return this.booksService.findOne(+id);
  }

  @Post()
  @ApiOperation({ summary: 'Создать новую книгу' })
  @ApiResponse({ status: 201, description: 'Книга создана', type: Book })
  create(@Body() createBookDto: CreateBookDto): Promise<Book> {
    return this.booksService.create(createBookDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Обновить книгу по ID' })
  @ApiParam({ name: 'id', description: 'ID книги', type: Number })
  @ApiResponse({ status: 200, description: 'Книга обновлена', type: Book })
  update(
    @Param('id') id: string,
    @Body() updateBookDto: UpdateBookDto,
  ): Promise<Book> {
    return this.booksService.update(+id, updateBookDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Удалить книгу по ID' })
  @ApiParam({ name: 'id', description: 'ID книги', type: Number })
  @ApiResponse({ status: 204, description: 'Книга удалена' })
  remove(@Param('id') id: string): Promise<void> {
    return this.booksService.remove(+id);
  }
}