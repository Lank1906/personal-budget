import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { User } from 'firebase/auth';
import { FirebaseAuthService } from '../../apis/auth';
import { userReq, userState } from '../../types/user';

const authService = new FirebaseAuthService();

const initialState: userState = {
  user: null,
};

export const login = createAsyncThunk('user/loginUser', async ({ email, password }: userReq) => {
  await authService.login(email, password);
});

export const register = createAsyncThunk('user/register', async ({ email, password }: userReq) => {
  await authService.register(email, password);
});

export const loginWithGoogle = createAsyncThunk('user/loginWithGoogle', async () => {
  await authService.loginWithGoogle();
});

export const logout = createAsyncThunk('user/logout', async () => {
  await authService.logout();
});

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
