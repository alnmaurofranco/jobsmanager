import dotenv from 'dotenv';

const loadedEnv = dotenv.config({
  path:
    process.env.NODE_ENV === 'production'
      ? './.env.production'
      : './.env.development',
});

if (loadedEnv.error) {
  throw loadedEnv.error;
}
