import 'express-async-errors';
import express from 'express';
import path from 'path';

import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';
import { errorHandler } from './errors/errorMiddleware';
import { notFoundHandler } from './errors/notFound';
import routes from './routes/routes';
import routesapi from './routes';

const server = express();

server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.disable('x-powered-by');

// Template
server.set('view engine', 'ejs');
server.use(express.static('public'));
server.set('views', path.join(__dirname, 'views'));

// Middlewares
server.use(
  cors({
    origin: '*',
  })
);

if (process.env.NODE_ENV === 'production') {
  server.use(morgan('tiny'));
  server.use(helmet());
} else {
  server.use(morgan('dev'));
}

// Rotas
server.use(routes);

server.use('/api', routesapi);

server.use(errorHandler);
server.use(notFoundHandler);

export default server;
