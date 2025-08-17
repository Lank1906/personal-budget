import { User } from 'firebase/auth';
import { CallApiOption } from './api';

export interface userReq {
  email: string;
  password: string;
}
export interface userState {
  user: User | null;
}
export interface userReqWithOptions extends userReq {
  options?: CallApiOption;
}
