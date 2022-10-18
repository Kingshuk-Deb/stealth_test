import { config } from 'dotenv';
config();
export const {
  ENV = 'DEVELOPMENT',
  PORT,
  JWT_SECRET,
  DATABASE_URL
} = process.env;
