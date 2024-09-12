import { Request, Response, NextFunction } from 'express';

export class HttpError extends Error {
  status: number;
  message: string;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

export const errorHandler = (
  err: HttpError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const status = err.status || 500;
  const message = err.message || 'Internal Server Error';

  console.error(`[${new Date().toISOString()}] Error occurred: ${message}`, {
    status,
    method: req.method,
    url: req.url,
    stack: err.stack,
  });

  res.status(status).json({ error: message });
};
