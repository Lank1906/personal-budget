import { User } from 'firebase/auth';
import { CallApiOption } from './api';

export interface userInfo {
  displayName: string;
  email: string;
  photoURL: string;
  groups: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface userReq {
  email: string;
  password: string;
}

export interface userState {
  user: User | null;
  info: userInfo | null;
}

export interface userReqWithOptions extends userReq {
  options?: CallApiOption;
}
