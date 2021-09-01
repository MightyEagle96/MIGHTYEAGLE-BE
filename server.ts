import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { app } from './app';

dotenv.config({ path: '.env' });

let DATABASE = process.env.DATABASE || '';
let DATABASE_LOCAL = process.env.DATABASE_LOCAL || '';

mongoose
  .connect(DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    console.log('DB Connected successfully');
  })
  .catch((e) => {
    console.log('DB could not connect at this time');
    process.exit(1);
  });
app.listen(process.env.PORT, () => {
  console.log(`${process.env.PORT} is listening`);
});
