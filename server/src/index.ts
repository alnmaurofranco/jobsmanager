import 'reflect-metadata';
import { baseUrl, port } from '@config/index';
import server from './server';
import '@database/index';

server.listen(port, () =>
  console.log(`Server started on ${baseUrl}:${port} ✨`)
);
