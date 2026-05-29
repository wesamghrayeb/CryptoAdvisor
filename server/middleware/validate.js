import { validationResult } from 'express-validator';
import { errorResponse } from '../utils/apiResponse.js';

export const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const message = errors.array().map((e) => e.msg).join(', ');
    return errorResponse(res, message, 400);
  }
  next();
};
