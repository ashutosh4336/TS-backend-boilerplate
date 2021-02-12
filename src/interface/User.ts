import mongoose, { Document, Model } from 'mongoose';

export interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  userName: string;
  userRole: mongoose.Types.ObjectId | string;
  password: string;
  avatar?: string;
  isDeleted: boolean;
  confirmEmailToken?: string;
  confirmEmailTokenExpire?: string;
  varified: boolean;
}
