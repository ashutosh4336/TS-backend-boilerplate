import { model, Schema, Model, Document } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { IUser } from '../interface/User';

export const DOCUMENT_NAME = 'User';
export const COLLECTION_NAME = 'users';

const UserSchema: Schema = new Schema(
  {
    firstName: {
      type: String,
      trim: true,
      required: [true, 'Please Provide Your First name'],
    },
    lastName: {
      type: String,
      trim: true,
      required: [true, 'Please Provide Your Last name'],
    },
    email: {
      type: String,
      required: [true, 'Please add a email'],
      unique: true,
      trim: true,
      index: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please add a valid email',
      ],
    },
    userRole: {
      type: Schema.Types.ObjectId,
      ref: 'role',
      required: true,
    },
    password: {
      type: String,
      required: [true, 'Please Provide Password'],
      minlength: 8,
      select: false,
      trim: true,
    },

    avatar: {
      type: String,
      default: 'uploads/no-photo.png',
    },

    isDeleted: {
      type: Boolean,
      enum: [false, true],
      default: false,
    },

    confirmEmailToken: String,
    confirmEmailTokenExpire: String,

    varified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
    collection: COLLECTION_NAME,
  }
);

// Hash Password using bryptjs
UserSchema.pre<IUser>('save', async function (next): Promise<string | void> {
  if (!this.isModified('password')) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const User = model<IUser>(DOCUMENT_NAME, UserSchema);
export default User;
