import { Request, Response, NextFunction } from 'express';
import asyncHandler from '../../middleware/async';
import ErrorResponse from '../../utils/errorResponse';
import { updateUserSchema } from '../../validation/user';

/**
 *
 * @desc        Test Route
 * @route       GET /api/v1/auth/test
 * @access      Private
 */
const updateUser = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    let message: any = '';

    let { error, value } = updateUserSchema.validate(req.body, {
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

    return res.status(200).json({ msg: 'User Details Upadted', data: value });
  }
);

export { updateUser };
