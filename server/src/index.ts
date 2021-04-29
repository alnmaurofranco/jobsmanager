import 'reflect-metadata';
import { server as serverConfig } from '@config/index';
import server from './server';
import '@database/index';

if (!serverConfig.port) process.exit(1);

server.listen(serverConfig.port, () =>
  console.log(
    `Server started on ${serverConfig.baseURL}:${serverConfig.port} ✨`
  )
);
