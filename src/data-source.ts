import { DataSource } from 'typeorm';
import { config } from './config';
import { Author } from './entities/author.entity';
import { Book } from './entities/book.entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: config.database.host,
  port: config.database.port,
  username: config.database.username,
  password: config.database.password,
  database: config.database.name,
  entities: [Author, Book],
  migrations: [__dirname + '/migrations/*{.ts,.js}'],
  synchronize: false,
});