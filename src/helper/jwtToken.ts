import { IUser } from '../interface/User';
import jwt from 'jsonwebtoken';

// Sign JWT and return
const generateSignedJwtToken = (user: IUser, role: string) => {
  return jwt.sign(
    {
      id: user._id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      userRole: role,
    },
    `${process.env.JWT_SECRET}`,
    {
      expiresIn: process.env.JWT_EXPIRE,
    }
  );
};

export default generateSignedJwtToken;
