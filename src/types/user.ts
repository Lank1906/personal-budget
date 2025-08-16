import { User } from 'firebase/auth';

export interface userReq {
  email: string;
  password: string;
}
export interface userState {
  user: User | null;
}
