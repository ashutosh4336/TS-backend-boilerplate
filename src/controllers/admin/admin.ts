import { Request, Response, NextFunction } from 'express';
import asyncHandler from '../../middleware/async';
import ErrorResponse from '../../utils/errorResponse';

/**
 *
 * @desc        Test Route
 * @route       GET /api/v1/admin
 * @access      Public
 */
const testAdmin = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    return res.status(200).json({ msg: 'Admin Works' });
  }
);

export { testAdmin };
