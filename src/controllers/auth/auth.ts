import { Request, Response, NextFunction } from 'express';
import asyncHandler from '../../middleware/async';
import ErrorResponse from '../../utils/errorResponse';
import generateSignedJwtToken from '../../helper/jwtToken';
import matchPassword from '../../helper/matchPassword';
import Role from '../../models/Role';
import { signupUserSchema, loginUserSchema } from '../../validation/user';
import User from '../../models/User';
import mongoose, { Types } from 'mongoose';

/**
 *
 * @desc        Test Route [SKIP / REMOVE THIS]
 * @route       GET /api/v1/auth/test
 * @access      Public
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
 * @desc        Register User
 * @route       POST /api/v1/auth/register
 * @access      Public
 */
const signupUser = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const role = await Role.find({});
    let message: any = '';

    const { error, value } = signupUserSchema.validate(req.body, {
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

    if (value.userRole.toUpperCase() === 'ADMIN') {
      message = "Admin can't be Created";
      return next(new ErrorResponse(message, 422));
    }

    const extractUserRole: any = role.find(
      (el: any) => el.value === value.userRole.toUpperCase()
    );

    if (!extractUserRole) {
      message = 'Invalid User Type...';
      return next(new ErrorResponse(message, 422));
    }

    const user: any = {
      firstName: value.firstName,
      lastName: value.lastName,
      userName: value.userName,
      email: value.email,
      password: value.password,
      phone: value.phone,
      userRole: Types.ObjectId(extractUserRole?._id),
    };

    const createdUser = await User.create(user);

    const toBeSentUser = {
      _id: createdUser?._id,
      firstName: createdUser?.firstName,
      lastName: createdUser?.lastName,
      userName: createdUser?.userName,
      email: createdUser?.email,
      userRole: extractUserRole?.value,
      token: generateSignedJwtToken(createdUser, extractUserRole?.value),
    };

    return res
      .status(201)
      .json({ message: 'Signup successfull', code: 201, data: toBeSentUser });
  }
);

/**
 *
 * @desc        Login User
 * @route       POST /api/v1/auth/login
 * @access      Public
 */

const loginUser = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    let message: any = '';

    const { error, value } = loginUserSchema.validate(req.body, {
      abortEarly: false,
    });
    if (!!error) {
      error?.details.forEach((a, b) => {
        message =
          (message && `${message},`) + (a.message.replace(/\"/g, '') + '.');
      });
      return next(new ErrorResponse(message, 422));
    }

    const toBeSentUser = {};

    return res
      .status(201)
      .json({ message: 'Login successfull', code: 201, data: toBeSentUser });
  }
);

export { testAuth, signupUser, loginUser };
