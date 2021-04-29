import { CorsOptions } from 'cors';

interface Server {
  port: number;
  origin?: string;
  optionsCors: CorsOptions;
}

const optionsCors: CorsOptions = {
  allowedHeaders: [
    'Origin',
    'X-Requested-With',
    'Content-Type',
    'Accept',
    'X-Access-Token',
    'Authorization',
  ],
  credentials: true,
  methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
  origin: process.env.API_URL_ACCESS_CORS,
  preflightContinue: false,
};

export default {
  optionsCors,
} as Server;
