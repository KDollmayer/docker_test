import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

export const validate = (
  schema: Joi.ObjectSchema,
  source: 'params' | 'body' | 'query'
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req[source]);

    if (error) {
      return res
        .status(400)
        .json({
          error: error.details.map((detail) => detail.message).join(', '),
        });
    }

    next();
  };
};
