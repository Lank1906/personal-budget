export interface ConfirmDialogProps {
  open: boolean;
  title?: string;
  description?: string;
  onCancel?: (() => void) | undefined;
  onConfirm?: (() => void) | undefined;
  confirmText?: string;
  cancelText?: string;
}
