import express from 'express';
import dotenv from 'dotenv';
import path from 'path';

import { connectToDatabase } from './databaseConnection';
import { loadDatabase } from './generateData';
import { findAll, findOne } from './controllers/order.controller';

dotenv.config();

const HOST = process.env.HOST || 'http://localhost';
const PORT = parseInt(process.env.PORT || '4500');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
  return res.json({ message: 'Hello World!' });
});

app.get('/orders', findAll);
app.get('/orders/:id', findOne);

app.use(express.static(path.resolve(__dirname, '../public')));

app.listen(PORT, async () => {
  await connectToDatabase();

  await loadDatabase(process.env.FAKER_LOCALE, process.env.CLEAN_DB === 'true');

  console.log(`Application started on URL ${HOST}:${PORT} 🎉`);
});