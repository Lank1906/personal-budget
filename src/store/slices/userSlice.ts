import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { User } from 'firebase/auth';
import { FirebaseAuthService } from '../../apis/auth';
import { userInfo, userReqWithOptions, userState } from '../../types/user';
import { CallApiOption } from '../../types/api';
import { initUserData } from '../../apis/initData';

const authService = new FirebaseAuthService();

const initialState: userState = {
  user: null,
  info: null,
};

export const login = createAsyncThunk<userState, userReqWithOptions>(
  'user/loginUser',
  async ({ email, password, options }, { rejectWithValue }) => {
    const res = await authService.login(email, password, { successFn: options?.successFn });
    if (res.success) {
      const user = res.data as User;
      const infoRes = await authService.getUserInfo(user.email!);
      const info = infoRes.success ? (infoRes.data as userInfo) : null;
      return { user, info };
    } else return rejectWithValue(res.error);
  },
);

export const register = createAsyncThunk<userState, userReqWithOptions>(
  'user/register',
  async ({ email, password, options }, { rejectWithValue }) => {
    const res = await authService.register(email, password, { successFn: options?.successFn });
    if (res.success) {
      const user = res.data as User;

      await initUserData({
        email: user.email!,
        displayName: user.displayName || 'Anonymous',
        photoURL: user.photoURL || '',
      });

      const infoRes = await authService.getUserInfo(user.email!);
      const info = infoRes.success ? (infoRes.data as userInfo) : null;

      return { user, info };
    } else return rejectWithValue(res.error);
  },
);

export const loginWithGoogle = createAsyncThunk<userState, CallApiOption>(
  'user/loginWithGoogle',
  async (options, { rejectWithValue }) => {
    const res = await authService.loginWithGoogle({ successFn: options?.successFn });
    if (res.success) {
      const user = res.data as User;

      await initUserData({
        email: user.email!,
        displayName: user.displayName || 'Anonymous',
        photoURL: user.photoURL || '',
      });

      const infoRes = await authService.getUserInfo(user.email!);
      const info = infoRes.success ? (infoRes.data as userInfo) : null;

      return { user, info };
    } else return rejectWithValue(res.error);
  },
);

export const logout = createAsyncThunk<null, CallApiOption>(
  'user/logout',
  async (options, { rejectWithValue }) => {
    const res = await authService.logout({ successFn: options.successFn });
    if (res.success) return null;
    else return rejectWithValue(res.error);
  },
);

export const getInfo = createAsyncThunk('user/info', async (email: string, { rejectWithValue }) => {
  const res = await authService.getUserInfo(email);
  if (res.success) return res.data;
  else return rejectWithValue(res.error);
});

export const currentUser = createAsyncThunk<null, CallApiOption>(
  'user/current',
  async (options, { rejectWithValue }) => {
    const res = await authService.getCurrentUser();
    if (res) return null;
    else return rejectWithValue(false);
  },
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state: userState, action: PayloadAction<userState | null>) {
      if (!action.payload) return;
      state.user = action.payload.user;
      state.info = action.payload.info;
    },
  },
  extraReducers: (builder: any) => {
    builder.addCase(
      login.fulfilled,
      (state: userState, action: PayloadAction<userState | null>) => {
        if (!action.payload) return;
        state.user = action.payload.user;
        state.info = action.payload.info;
      },
    );
    builder.addCase(
      register.fulfilled,
      (state: userState, action: PayloadAction<userState | null>) => {
        if (!action.payload) return;
        state.user = action.payload.user;
        state.info = action.payload.info;
      },
    );
    builder.addCase(
      loginWithGoogle.fulfilled,
      (state: userState, action: PayloadAction<userState | null>) => {
        if (!action.payload) return;
        state.user = action.payload.user;
        state.info = action.payload.info;
      },
    );
    builder.addCase(
      getInfo.fulfilled,
      (state: userState, action: PayloadAction<userInfo | null>) => {
        if (!action.payload) return;
        state.info = action.payload;
      },
    );
    builder.addCase(logout.fulfilled, (state: userState) => {
      state.user = null;
      state.info = null;
    });
  },
});
export const { setUser } = userSlice.actions;
export default userSlice.reducer;
