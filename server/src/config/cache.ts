import { RedisOptions } from 'ioredis';

interface RedisConfig {
  redis: RedisOptions;
}

export default {
  redis: {
    host: process.env.REDIS_HOST || 'localhost',
    port: process.env.REDIS_PORT || 6379,
    password: process.env.REDIS_PASS || undefined,
  },
} as RedisConfig;
