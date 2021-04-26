import { Request, Response, NextFunction } from 'express';

export const notFoundHandler = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const message = 'Resource not found';

  response.render('404', {
    message,
  });

  // response.status(404).send(message);
};
