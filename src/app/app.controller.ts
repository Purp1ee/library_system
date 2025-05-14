import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Connection } from 'typeorm';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly connection: Connection,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/health')
  async healthCheck() {
    try {
      await this.connection.query('SELECT 1');
      return { status: 'Database connection OK' };
    } catch (error) {
      return { 
        error: 'Database connection failed',
        message: error.message 
      };
    }
  }
}