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
import i18n from '../i18n';

export class FirebaseAuthService {
  register(email: string, password: string, options?: CallApiOption<User>): ApiResult<User> {
    return callFirebaseApi({
      action: () => createUserWithEmailAndPassword(auth, email, password).then((res) => res.user),
      successFn: options?.successFn,
      failFn: options?.failFn,
      successMessage: options?.successMessage || (i18n.t('login.registerSuccess') as string),
      errorMessage: options?.errorMessage || (i18n.t('login.registerFail') as string),
      disableToast: options?.disableToast ?? false,
    });
  }

  login(email: string, password: string, options?: CallApiOption<User>): ApiResult<User> {
    return callFirebaseApi({
      action: () => signInWithEmailAndPassword(auth, email, password).then((res) => res.user),
      successFn: options?.successFn,
      failFn: options?.failFn,
      successMessage: options?.successMessage || (i18n.t('login.loginSuccess') as string),
      errorMessage: options?.errorMessage || (i18n.t('login.loginFail') as string),
      disableToast: options?.disableToast ?? false,
    });
  }

  loginWithGoogle(options?: CallApiOption<User>): ApiResult<User> {
    const provider = new GoogleAuthProvider();
    return callFirebaseApi({
      action: () => signInWithPopup(auth, provider).then((res) => res.user),
      successFn: options?.successFn,
      failFn: options?.failFn,
      successMessage: options?.successMessage || (i18n.t('login.loginWithGoogleSuccess') as string),
      errorMessage: options?.errorMessage || (i18n.t('login.loginWithGoogleFail') as string),
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
      successMessage: options?.successMessage || (i18n.t('login.changePasswordSuccess') as string),
      errorMessage: options?.errorMessage || (i18n.t('login.changePasswordFail') as string),
      disableToast: options?.disableToast ?? false,
    });
  }

  sendResetPasswordEmail(email: string, options?: CallApiOption<void>): ApiResult<void> {
    return callFirebaseApi({
      action: () => sendPasswordResetEmail(auth, email),
      successFn: options?.successFn,
      failFn: options?.failFn,
      successMessage: options?.successMessage || (i18n.t('login.resetPasswordEmailSent') as string),
      errorMessage: options?.errorMessage || (i18n.t('login.resetPasswordEmailFail') as string),
      disableToast: options?.disableToast ?? false,
    });
  }

  logout(options?: CallApiOption<void>): ApiResult<void> {
    return callFirebaseApi({
      action: () => signOut(auth),
      successFn: options?.successFn,
      failFn: options?.failFn,
      successMessage: options?.successMessage || (i18n.t('login.logoutSuccess') as string),
      errorMessage: options?.errorMessage || (i18n.t('login.logoutFail') as string),
      disableToast: options?.disableToast ?? false,
    });
  }

  getCurrentUser(): User | null {
    return auth.currentUser;
  }
}
