import Redis, { Redis as RedisClient } from 'ioredis';
import { cache } from '@config/index';

interface IRedisCache {
  save: (key: string, value: any) => Promise<void>;
  recover: <T>(key: string) => Promise<T | null>;
  invalidate: (key: string) => Promise<void>;
  invalidatePrefix: (prefix: string) => Promise<void>;
}

export default class RedisCache implements IRedisCache {
  private client: RedisClient;

  constructor() {
    this.client = new Redis(cache.redis);
  }

  public async save(key: string, value: any): Promise<void> {
    await this.client.set(key, JSON.stringify(value));
  }

  public async recover<T>(key: string): Promise<T | null> {
    const data = await this.client.get(key);

    if (!data) {
      return null;
    }

    const parsedData = JSON.parse(data) as T;

    return parsedData;
  }

  public async invalidate(key: string): Promise<void> {
    await this.client.del(key);
  }

  public async invalidatePrefix(prefix: string): Promise<void> {
    const keys = await this.client.keys(`${prefix}:*`);

    const pipeline = this.client.pipeline();

    keys.forEach((key) => {
      pipeline.del(key);
    });

    await pipeline.exec();
  }
}
