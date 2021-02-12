import mongoose, { Schema, model, Document } from 'mongoose';

export const DOCUMENT_NAME = 'Month';
export const COLLECTION_NAME = 'months';

export const enum monthCode {
  JANUARY = 'JANUARY',
  FEBRUARY = 'FEBRUARY',
  MARCH = 'MARCH',
  APRIL = 'APRIL',
  MAY = 'MAY',
  JUNE = 'JUNE',
  JULY = 'JULY',
  AUGUST = 'AUGUST',
  SEPTEMBER = 'SEPTEMBER',
  OCTOBER = 'OCTOBER',
  NOVEMBER = 'NOVEMBER',
  DECEMBER = 'DECEMBER',
}

export interface IMonth extends Document {
  _id: mongoose.Types.ObjectId;
  value: string;
}

const MonthSchema = new Schema(
  {
    _id: {
      type: mongoose.Types.ObjectId,
    },
    value: {
      type: Schema.Types.String,
      required: true,
      enum: [
        monthCode.JANUARY,
        monthCode.FEBRUARY,
        monthCode.MARCH,
        monthCode.APRIL,
        monthCode.MAY,
        monthCode.JUNE,
        monthCode.JULY,
        monthCode.AUGUST,
        monthCode.SEPTEMBER,
        monthCode.OCTOBER,
        monthCode.NOVEMBER,
        monthCode.DECEMBER,
      ],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const AccountStatus = model<IMonth>(
  DOCUMENT_NAME,
  MonthSchema,
  COLLECTION_NAME
);

export default AccountStatus;
