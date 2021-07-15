import './env';
import auth from './auth';
import cors from './cors';
import cache from './cache';

const { NODE_URL } = process.env;

interface IServer {
  port: number;
  baseURL: string;
}

const server = {
  port: parseInt(process.env.PORT as string, 10) || 4000,
  baseURL: NODE_URL,
} as IServer;

export { server, auth, cors, cache };
