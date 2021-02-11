import { Request, Response, NextFunction } from 'express';
import asyncHandler from '../../middleware/async';
import ErrorResponse from '../../utils/errorResponse';

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

export { testAuth };
