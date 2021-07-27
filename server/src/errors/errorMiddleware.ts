import { Request, Response, NextFunction } from 'express';
import HttpException from './httpException';

export const errorHandler = (
  error: HttpException,
  _request: Request,
  response: Response,
  _next: NextFunction
) => {
  const status = error.statusCode || 500;
  const message =
    error.message || "It's not you. It's us. We are having some problems.";

  response.status(status).send(message);
};
