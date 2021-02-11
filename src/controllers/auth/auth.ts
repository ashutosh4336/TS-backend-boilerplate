import { Request, Response, NextFunction } from 'express';
import asyncHandler from '../../middleware/async';
import ErrorResponse from '../../utils/errorResponse';
import { signupUserSchema } from '../../validation/user';
import User from '../../models/User';

/**
 *
 * @desc        Test Route
 * @route       GET /api/v1/auth/test
 * @access      Private
 */
const testAuth = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const number = Math.floor(Math.random() * 10);
    if (number < 6) {
      return next(new ErrorResponse(`ErrorResponse Works`, 400));
    }

    return res.status(200).json({ msg: 'Auth Works' });
  }
);

/**
 *
 * @desc        Test Route
 * @route       GET /api/v1/auth/test
 * @access      Private
 */
const signupUser = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    let message: any = '';

    let { error, value } = signupUserSchema.validate(req.body, {
      abortEarly: false,
    });

    if (!!error) {
      error?.details.forEach((a, b) => {
        message =
          (message && `${message.replace(/phone/g, 'Contact Number')},`) +
          (a.message.replace(/\"/g, '') + '.');
      });

      return next(new ErrorResponse(message, 422));
    }

    const user = await User.create(value);

    return res.status(201).json({ msg: 'Signup successfull', data: user });
  }
);

export { testAuth, signupUser };
