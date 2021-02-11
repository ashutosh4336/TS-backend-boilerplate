import mongoose, { Document, Model } from 'mongoose';

export interface IUserDocument extends Document {
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  password: string;
  avatar?: string;
  isDeleted: boolean;
  confirmEmailToken: string;
  confirmEmailTokenExpire: string;
  varified: boolean;

  comparePassword: (enteredPassword: string) => Promise<Boolean>;
  getSignedJwtToken: string;
}
