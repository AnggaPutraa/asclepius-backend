import { NextFunction, Request, Response } from 'express';
import { HttpError } from '../exceptions';

export const errorMiddleware = (
  error: HttpError,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const status = error.status || 500;
  const response = error.response ?? {
    status: 'fail',
    message: 'Internal server error',
  };

  res.status(status).send(response);
};
