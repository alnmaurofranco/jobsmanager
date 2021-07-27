import { NextFunction, Response, Request } from 'express';
import HttpException from '@errors/httpException';

const apiKeys = new Map();
apiKeys.set('b7cf7f4e-a148-4022-9b68-8778ca8315b5', true);

export default function apiKey(
  req: Request,
  res: Response,
  next: NextFunction
) {
  // eslint-disable-next-line no-shadow
  const apiKey = req.get('X-API-KEY');

  if (apiKeys.has(apiKey)) {
    next();
  } else {
    const err = new HttpException(400, 'Invalid API KEY');
    next(err);
  }
}
