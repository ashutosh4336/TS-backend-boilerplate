import { IUser } from '../interface/User';
import * as bcrypt from 'bcryptjs';

// Match User Entered password to hashed password in DB
const matchPassword = async (
  enteredPassword: string,
  user: IUser
): Promise<boolean> => await bcrypt.compare(enteredPassword, user.password);

export default matchPassword;
