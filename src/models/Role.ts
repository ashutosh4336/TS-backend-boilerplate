import { Schema, model, Document } from 'mongoose';

export const DOCUMENT_NAME = 'Role';
export const COLLECTION_NAME = 'roles';

export const enum RoleCode {
  USER = 'USER',
  ADMIN = 'ADMIN',
}

export interface Role extends Document {
  code: string;
}

const RoleSchema = new Schema(
  {
    value: {
      type: Schema.Types.String,
      required: true,
      enum: [RoleCode.USER, RoleCode.ADMIN],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Role = model<Role>(DOCUMENT_NAME, RoleSchema, COLLECTION_NAME);

export default Role;
