import { auth } from '../firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  updatePassword,
  signOut,
  User,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';

import { callFirebaseApi } from './firebase';
import { CallApiOption } from '../types/api';
import { ApiResult } from '../types/apiResult';

export class FirebaseAuthService {
  register(email: string, password: string, options?: CallApiOption<User>): ApiResult<User> {
    return callFirebaseApi({
      action: () => createUserWithEmailAndPassword(auth, email, password).then((res) => res.user),
      successFn: options?.successFn,
      failFn: options?.failFn,
      successMessage: options?.successMessage || 'Đăng ký thành công!',
      errorMessage: options?.errorMessage || 'Đăng ký thất bại, vui lòng thử lại.',
      disableToast: options?.disableToast ?? false,
    });
  }

  login(email: string, password: string, options?: CallApiOption<User>): ApiResult<User> {
    return callFirebaseApi({
      action: () => signInWithEmailAndPassword(auth, email, password).then((res) => res.user),
      successFn: options?.successFn,
      failFn: options?.failFn,
      successMessage: options?.successMessage || 'Đăng nhập thành công!',
      errorMessage: options?.errorMessage || 'Đăng nhập thất bại, vui lòng kiểm tra lại.',
      disableToast: options?.disableToast ?? false,
    });
  }

  loginWithGoogle(options?: CallApiOption<User>): ApiResult<User> {
    const provider = new GoogleAuthProvider();
    return callFirebaseApi({
      action: () => signInWithPopup(auth, provider).then((res) => res.user),
      successFn: options?.successFn,
      failFn: options?.failFn,
      successMessage: options?.successMessage || 'Đăng nhập với Google thành công!',
      errorMessage: options?.errorMessage || 'Đăng nhập với Google thất bại.',
      disableToast: options?.disableToast ?? false,
    });
  }

  changePassword(newPassword: string, options?: CallApiOption<void>): ApiResult<void> {
    return callFirebaseApi({
      action: async () => {
        const user = auth.currentUser;
        if (!user) throw new Error('No user is logged in');
        await updatePassword(user, newPassword);
      },
      successFn: options?.successFn,
      failFn: options?.failFn,
      successMessage: options?.successMessage || 'Đổi mật khẩu thành công!',
      errorMessage: options?.errorMessage || 'Đổi mật khẩu thất bại.',
      disableToast: options?.disableToast ?? false,
    });
  }

  sendResetPasswordEmail(email: string, options?: CallApiOption<void>): ApiResult<void> {
    return callFirebaseApi({
      action: () => sendPasswordResetEmail(auth, email),
      successFn: options?.successFn,
      failFn: options?.failFn,
      successMessage: options?.successMessage || 'Email đặt lại mật khẩu đã được gửi!',
      errorMessage: options?.errorMessage || 'Gửi email đặt lại mật khẩu thất bại.',
      disableToast: options?.disableToast ?? false,
    });
  }

  logout(options?: CallApiOption<void>): ApiResult<void> {
    return callFirebaseApi({
      action: () => signOut(auth),
      successFn: options?.successFn,
      failFn: options?.failFn,
      successMessage: options?.successMessage || 'Đăng xuất thành công!',
      errorMessage: options?.errorMessage || 'Đăng xuất thất bại.',
      disableToast: options?.disableToast ?? false,
    });
  }

  getCurrentUser(): User | null {
    return auth.currentUser;
  }
}
