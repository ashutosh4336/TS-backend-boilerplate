import { Request, Response, NextFunction } from 'express';
import asyncHandler from '../../middleware/async';
import ErrorResponse from '../../utils/errorResponse';
import generateSignedJwtToken from 'src/helper/jwtToken';
import matchPassword from 'src/helper/matchPassword';
import { signupUserSchema } from '../../validation/user';
import User from '../../models/User';

/**
 *
 * @desc        Test Route [SKIP / REMOVE THIS]
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

    // const user = value;
    const user = await User.create(value);

    return res.status(201).json({ msg: 'Signup successfull', data: user });
  }
);

export { testAuth, signupUser };

/*
const a = {
  userRole: CastError: Cast to ObjectId failed for value "user" at path "userRole"
      at ObjectId.cast (/home/ashutosh/development/oAuthPassword/backend/node_modules/mongoose/lib/schema/objectid.js:281:11)
      at ObjectId.SchemaType.applySetters (/home/ashutosh/development/oAuthPassword/backend/node_modules/mongoose/lib/schematype.js:1088:12)
      at model.$set (/home/ashutosh/development/oAuthPassword/backend/node_modules/mongoose/lib/document.js:1269:20)
      at model.$set (/home/ashutosh/development/oAuthPassword/backend/node_modules/mongoose/lib/document.js:1013:16)
      at model.Document (/home/ashutosh/development/oAuthPassword/backend/node_modules/mongoose/lib/document.js:148:12)
      at model.Model (/home/ashutosh/development/oAuthPassword/backend/node_modules/mongoose/lib/model.js:105:12)
      at new model (/home/ashutosh/development/oAuthPassword/backend/node_modules/mongoose/lib/model.js:4700:15)
      at /home/ashutosh/development/oAuthPassword/backend/node_modules/mongoose/lib/model.js:3053:22
      at /home/ashutosh/development/oAuthPassword/backend/node_modules/mongoose/lib/model.js:3089:7
      at Array.forEach (<anonymous>)
      at /home/ashutosh/development/oAuthPassword/backend/node_modules/mongoose/lib/model.js:3088:15
      at /home/ashutosh/development/oAuthPassword/backend/node_modules/mongoose/lib/helpers/promiseOrCallback.js:31:5
      at new Promise (<anonymous>)
      at promiseOrCallback (/home/ashutosh/development/oAuthPassword/backend/node_modules/mongoose/lib/helpers/promiseOrCallback.js:30:10)
      at Mongoose._promiseOrCallback (/home/ashutosh/development/oAuthPassword/backend/node_modules/mongoose/lib/index.js:1135:10)
      at Function.create (/home/ashutosh/development/oAuthPassword/backend/node_modules/mongoose/lib/model.js:3023:23) {
    stringValue: '"user"',
    messageFormat: undefined,
    kind: 'ObjectId',
    value: 'user',
    path: 'userRole',
    reason: Error: Argument passed in must be a single String of 12 bytes or a string of 24 hex characters
        at new ObjectID (/home/ashutosh/development/oAuthPassword/backend/node_modules/bson/lib/bson/objectid.js:59:11)
        at castObjectId (/home/ashutosh/development/oAuthPassword/backend/node_modules/mongoose/lib/cast/objectid.js:25:12)
        at ObjectId.cast (/home/ashutosh/development/oAuthPassword/backend/node_modules/mongoose/lib/schema/objectid.js:279:12)
        at ObjectId.SchemaType.applySetters (/home/ashutosh/development/oAuthPassword/backend/node_modules/mongoose/lib/schematype.js:1088:12)
        at model.$set (/home/ashutosh/development/oAuthPassword/backend/node_modules/mongoose/lib/document.js:1269:20)
        at model.$set (/home/ashutosh/development/oAuthPassword/backend/node_modules/mongoose/lib/document.js:1013:16)
        at model.Document (/home/ashutosh/development/oAuthPassword/backend/node_modules/mongoose/lib/document.js:148:12)
        at model.Model (/home/ashutosh/development/oAuthPassword/backend/node_modules/mongoose/lib/model.js:105:12)
        at new model (/home/ashutosh/development/oAuthPassword/backend/node_modules/mongoose/lib/model.js:4700:15)
        at /home/ashutosh/development/oAuthPassword/backend/node_modules/mongoose/lib/model.js:3053:22
        at /home/ashutosh/development/oAuthPassword/backend/node_modules/mongoose/lib/model.js:3089:7
        at Array.forEach (<anonymous>)
        at /home/ashutosh/development/oAuthPassword/backend/node_modules/mongoose/lib/model.js:3088:15
        at /home/ashutosh/development/oAuthPassword/backend/node_modules/mongoose/lib/helpers/promiseOrCallback.js:31:5
        at new Promise (<anonymous>)
        at promiseOrCallback (/home/ashutosh/development/oAuthPassword/backend/node_modules/mongoose/lib/helpers/promiseOrCallback.js:30:10)
  }
}
*/
