import { NextFunction, Response, Request } from 'express';
import { RateLimiterRedis } from 'rate-limiter-flexible';
import redis from 'redis';
import HttpException from '../errors/httpException';

const redisClient = redis.createClient({
  host: process.env.REDIS_HOST,
  port: Number(process.env.REDIS_PORT),
  password: process.env.REDIS_PASS || undefined,
});

const accessRateLimiter = new RateLimiterRedis({
  storeClient: redisClient,
  keyPrefix: 'ratelimit',
  points: 12,
  duration: 6,
});

export default async function rateLimiter(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    await accessRateLimiter.consume(req.ip);

    return next();
  } catch (error) {
    throw new HttpException(429, 'Too many requests');
  }
}
