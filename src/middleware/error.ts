import { ErrorRequestHandler, Request, Response, NextFunction } from 'express';
import colors from 'colors';
import ErrorResponse from '../utils/errorResponse';

const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let message;
  let error = { ...err };

  error.message = err.message;

  // Log To Console For Developer
  if (process.env.NODE_ENV === 'developemnt') {
    console.log('Coming Into error file', colors.red(err.stack));
  }

  //   Mongoose bad ObejctID
  if (err.name === 'CastError') {
    message = `Resource not found ${err.value}`;
    error = new ErrorResponse(message, 404);
  }

  //   Mongoose Duplicat Key
  if (err.code === 11000) {
    message = `Duplicate filed entered`;
    error = new ErrorResponse(message, 422);
  }

  //   Mongoose Validation Error
  if (err.name === 'ValidationError') {
    message = Object.values(err.errors).map((val: any) => val.message);
    error = new ErrorResponse(message, 422);
  }

  return res
    .status(error.statusCode || 500)
    .json({ sucess: false, error: error.message || 'Something Went Wrong' });
};

export default errorHandler;
