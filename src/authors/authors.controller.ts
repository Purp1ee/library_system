import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { AuthorsService } from './authors.service';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';

import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { Author } from './entities/author.entity';

@ApiTags('authors')
@Controller('authors')
export class AuthorsController {
  constructor(private readonly authorsService: AuthorsService) {}

  @Get()
  @ApiOperation({ summary: 'Получить список всех авторов' })
  @ApiResponse({ status: 200, description: 'Массив авторов', type: [Author] })
  findAll(): Promise<Author[]> {
    return this.authorsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Получить автора по ID' })
  @ApiParam({ name: 'id', description: 'ID автора', type: Number })
  @ApiResponse({ status: 200, description: 'Автор найден', type: Author })
  findOne(@Param('id') id: string): Promise<Author> {
    return this.authorsService.findOne(+id);
  }

  @Post()
  @ApiOperation({ summary: 'Создать нового автора' })
  @ApiResponse({ status: 201, description: 'Автор создан', type: Author })
  create(@Body() createAuthorDto: CreateAuthorDto): Promise<Author> {
    return this.authorsService.create(createAuthorDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Обновить автора по ID' })
  @ApiParam({ name: 'id', description: 'ID автора', type: Number })
  @ApiResponse({ status: 200, description: 'Автор обновлен', type: Author })
  update(
    @Param('id') id: string,
    @Body() updateAuthorDto: UpdateAuthorDto,
  ): Promise<Author> {
    return this.authorsService.update(+id, updateAuthorDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Удалить автора по ID' })
  @ApiParam({ name: 'id', description: 'ID автора', type: Number })
  @ApiResponse({ status: 204, description: 'Автор удален' })
  remove(@Param('id') id: string): Promise<void> {
    return this.authorsService.remove(+id);
  }
}