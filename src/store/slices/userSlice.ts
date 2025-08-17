import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { User } from 'firebase/auth';
import { FirebaseAuthService } from '../../apis/auth';
import { userReqWithOptions, userState } from '../../types/user';
import { CallApiOption } from '../../types/api';

const authService = new FirebaseAuthService();

const initialState: userState = {
  user: null,
};

export const login = createAsyncThunk<User, userReqWithOptions>(
  'user/loginUser',
  async ({ email, password, options }, { rejectWithValue }) => {
    const res = await authService.login(email, password, { successFn: options?.successFn });
    if (res.success) return res.data as User;
    else return rejectWithValue(res.error);
  },
);

export const register = createAsyncThunk<User, userReqWithOptions>(
  'user/register',
  async ({ email, password, options }, { rejectWithValue }) => {
    const res = await authService.register(email, password, { successFn: options?.successFn });
    if (res.success) return res.data as User;
    else return rejectWithValue(res.error);
  },
);

export const loginWithGoogle = createAsyncThunk<User, CallApiOption>(
  'user/loginWithGoogle',
  async (options, { rejectWithValue }) => {
    const res = await authService.loginWithGoogle({ successFn: options?.successFn });
    if (res.success) return res.data as User;
    else return rejectWithValue(res.error);
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

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state: userState, action: PayloadAction<User | null>) {
      state.user = action.payload;
    },
  },
  extraReducers: (builder: any) => {
    builder.addCase(login.fulfilled, (state: userState, action: PayloadAction<User | null>) => {
      state.user = action.payload;
    });
    builder.addCase(register.fulfilled, (state: userState, action: PayloadAction<User | null>) => {
      state.user = action.payload;
    });
    builder.addCase(
      loginWithGoogle.fulfilled,
      (state: userState, action: PayloadAction<User | null>) => {
        state.user = action.payload;
      },
    );
    builder.addCase(logout.fulfilled, (state: userState) => {
      state.user = null;
    });
  },
});
export const { setUser } = userSlice.actions;
export default userSlice.reducer;
