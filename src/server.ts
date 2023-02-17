import express, { Application } from 'express';
import { Server } from 'http';
import connectDb from './config/db';
import dotenv from 'dotenv';
import morgan from 'morgan';
import { errorHandler, notFound } from './middleware/error.middleware';
import cors from 'cors';
import path from 'path';
import sanitizedConfig from './config';

import testRoute from './routes/test.route';
import productRoute from './routes/product.route';
import userRoute from './routes/user.route';
import orderRoute from './routes/order.route';
import uploadRoute from './routes/upload.route';

dotenv.config({
  path: path.resolve(__dirname, '/.env'),
});

connectDb();

const app: Application = express();

if (sanitizedConfig.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());
app.use(cors());

app.get('/', testRoute);
app.use('/api/products', productRoute);
app.use('/api/users', userRoute);
app.use('/api/orders', orderRoute);
app.use('/api/uploads', uploadRoute);

app.use('/uploads', express.static(path.join(process.cwd(), '/uploads')));

app.use(notFound);
app.use(errorHandler);

const PORT: number | string = sanitizedConfig.PORT || 1337;

const server: Server = app.listen(PORT, () =>
  console.log(
    `Server running in ${sanitizedConfig.NODE_ENV} mode on port ${PORT}`
  )
);
