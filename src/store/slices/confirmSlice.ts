import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ConfirmDialogProps } from '../../types/confirmDialog';

const initialState: ConfirmDialogProps = {
  open: false,
  onCancel: undefined,
  onConfirm: undefined,
};

const confirmSlice = createSlice({
  name: 'confirm',
  initialState,
  reducers: {
    openConfirm(state, action: PayloadAction<Omit<ConfirmDialogProps, 'open'>>) {
      state.open = true;
      state.title = action.payload.title;
      state.description = action.payload.description;
      state.onConfirm = action.payload.onConfirm;
      state.onCancel = action.payload.onCancel;
      state.confirmText = action.payload.confirmText;
      state.cancelText = action.payload.cancelText;
    },
    closeConfirm(state) {
      state.open = false;
      state.title = undefined;
      state.description = undefined;
      state.onConfirm = undefined;
      state.onCancel = undefined;
    },
  },
});

export const { openConfirm, closeConfirm } = confirmSlice.actions;
export default confirmSlice.reducer;
