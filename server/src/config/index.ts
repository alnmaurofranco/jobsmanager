import './env';
import auth from './auth';
import cors from './cors';

const { NODE_PORT, NODE_URL } = process.env;

interface IServer {
  port: number;
  baseURL: string;
}

const server = {
  port: parseInt(NODE_PORT as string, 10) || 4000,
  baseURL: NODE_URL,
} as IServer;

export { server, auth, cors };
