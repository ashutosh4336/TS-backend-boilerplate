import mongoose, { Schema, model, Document } from 'mongoose';

export const DOCUMENT_NAME = 'AccountStatus';
export const COLLECTION_NAME = 'account_status';

export const enum AccountCode {
  NEW = 'NEW',
  ARCHIVED = 'ARCHIVED',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

export interface IAccount extends Document {
  _id: mongoose.Types.ObjectId;
  value: string;
}

const AccountStatusSchema = new Schema(
  {
    _id: {
      type: mongoose.Types.ObjectId,
    },
    value: {
      type: Schema.Types.String,
      required: true,
      enum: [
        AccountCode.NEW,
        AccountCode.ARCHIVED,
        AccountCode.APPROVED,
        AccountCode.REJECTED,
        AccountCode.ACTIVE,
        AccountCode.INACTIVE,
      ],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const AccountStatus = model<IAccount>(
  DOCUMENT_NAME,
  AccountStatusSchema,
  COLLECTION_NAME
);

export default AccountStatus;
