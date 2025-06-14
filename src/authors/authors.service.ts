import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { Author } from './entities/author.entity';

@Injectable()
export class AuthorsService {
  constructor(
    @InjectRepository(Author)
    private authorRepository: Repository<Author>,
  ) {}

  async findAll(): Promise<Author[]> {
    return this.authorRepository.find({ relations: ['books'] });
  }

  async findOne(id: number): Promise<Author> {
    const author = await this.authorRepository.findOne({
      where: { id },
      relations: ['books'],
    });
    if (!author) {
      throw new NotFoundException(`Автор с id=${id} не найден`);
    }
    return author;
  }

  async create(dto: CreateAuthorDto): Promise<Author> {
    const author = new Author();
    author.name = dto.name; // Теперь просто присваиваем без преобразования имен
    author.birthDate = dto.birthDate ? new Date(dto.birthDate) : undefined;
    
    return this.authorRepository.save(author);
  }

  async update(id: number, dto: UpdateAuthorDto): Promise<Author> {
    const author = await this.findOne(id);

    if (dto.name !== undefined) {
      author.name = dto.name;
    }
    if (dto.birthDate !== undefined) {
      author.birthDate = new Date(dto.birthDate);
    }

    return this.authorRepository.save(author);
  }

  async remove(id: number): Promise<void> {
    try {
      await this.authorRepository.delete(id);
    } catch (error) {
      throw new BadRequestException('Невозможно удалить автора с книгами');
    }
  }
}