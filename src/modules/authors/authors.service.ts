import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Author } from '../../entities/author.entity';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';

@Injectable()
export class AuthorsService {
  constructor(
    @InjectRepository(Author)
    private authorsRepository: Repository<Author>,
  ) {}

  async findAll(): Promise<Author[]> {
    return this.authorsRepository.find();
  }

  async findOne(id: number): Promise<Author> {
    const author = await this.authorsRepository.findOne({ where: { id } });
    if (!author) {
      throw new NotFoundException(`Author with ID ${id} not found`);
    }
    return author;
  }

  async create(createAuthorDto: CreateAuthorDto): Promise<Author> {
    const author = this.authorsRepository.create(createAuthorDto);
    return this.authorsRepository.save(author);
  }

  async update(id: number, updateAuthorDto: UpdateAuthorDto): Promise<Author> {
    const author = await this.findOne(id);
    this.authorsRepository.merge(author, updateAuthorDto);
    return this.authorsRepository.save(author);
  }

  async remove(id: number): Promise<void> {
    const author = await this.findOne(id);
    try {
      await this.authorsRepository.remove(author);
    } catch (err) {
      throw new Error('Cannot delete author with existing books');
    }
  }
}