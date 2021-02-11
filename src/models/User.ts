import { model, Schema, Model, Document } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { IUserDocument } from '../interface/User';

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
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please add a valid email',
      ],
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
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
  }
);

// Hash Password using bryptjs
UserSchema.pre<IUserDocument>('save', async function (next): Promise<
  string | void
> {
  if (!this.isModified('password')) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

export default model<IUserDocument>('User', UserSchema);
