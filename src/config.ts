import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

export const config = {
  database: {
    username: process.env.DB_USERNAME as string,
    password: process.env.DB_PASSWORD as string,
    port: parseInt(process.env.DB_PORT || '5432'),
    name: process.env.DB_NAME as string,
    host: process.env.DB_HOST as string,
  },
} as const;