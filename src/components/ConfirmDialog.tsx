import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from '@mui/material';
import WarningAmberRoundedIcon from '@mui/icons-material/WarningAmberRounded';
import { closeConfirm } from '../store/slices/confirmSlice';

export default function ConfirmDialog() {
  const dispatch = useDispatch<AppDispatch>();
  const { open, title, description, onConfirm, onCancel, confirmText, cancelText } = useSelector(
    (state: RootState) => state.confirm,
  );

  const handleClose = () => {
    if (onCancel) onCancel();
    dispatch(closeConfirm());
  };

  const handleConfirm = () => {
    if (onConfirm) onConfirm();
    dispatch(closeConfirm());
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="xs"
      fullWidth
      PaperProps={{
        sx: { borderRadius: 3, p: 1.5 },
      }}
    >
      {}
      <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <WarningAmberRoundedIcon sx={{ color: 'warning.main' }} />
        <Typography variant="h6" fontWeight="bold">
          {title || 'Confirm'}
        </Typography>
      </DialogTitle>

      {}
      <DialogContent>
        <DialogContentText>{description || 'Are you sure you want to proceed?'}</DialogContentText>
      </DialogContent>

      {}
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button
          onClick={handleClose}
          variant="outlined"
          color="inherit"
          sx={{ textTransform: 'none', borderRadius: 2 }}
        >
          {cancelText || 'Cancel'}
        </Button>
        <Button
          onClick={handleConfirm}
          variant="contained"
          color="error"
          sx={{ textTransform: 'none', borderRadius: 2, boxShadow: 2 }}
        >
          {confirmText || 'OK'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
