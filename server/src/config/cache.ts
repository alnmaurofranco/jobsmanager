import { RedisOptions } from 'ioredis';

interface RedisConfig {
  redis: RedisOptions;
}

export default {
  redis: {
    host: process.env.REDIS_HOST,
    port: Number(process.env.REDIS_PORT),
    password: process.env.REDIS_PASS || undefined,
  },
} as RedisConfig;
