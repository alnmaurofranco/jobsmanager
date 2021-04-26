import HttpException from '@errors/httpException';
import { NextFunction, Request, Response } from 'express';
import { verifyToken } from '@utils/AuthSecurity';

interface ITokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

const ensureAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new HttpException(401, 'JWT token is missing');
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded: unknown = verifyToken(token);

    const { sub } = decoded as ITokenPayload;

    req.user = {
      id: sub,
    };

    return next();
  } catch {
    throw new HttpException(401, 'Invalid JWT token');
  }
};

export default ensureAuthenticated;
