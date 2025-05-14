import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AuthorsModule } from './modules/authors/authors.module';
import { BooksModule } from './modules/books/books.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [DatabaseModule, AuthorsModule, BooksModule],
  controllers: [AppController],
})
export class AppModule {}