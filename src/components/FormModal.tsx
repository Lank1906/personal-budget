import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Grid,
  Typography,
  Box,
} from '@mui/material';

export type FieldConfig = {
  key: string;
  label: string;
  type?: 'text' | 'number' | 'date' | 'select' | 'password';
  options?: string[];
  placeholder?: string;
};

interface RowFormModalProps<T extends Record<string, any>> {
  open: boolean;
  initialData?: T;
  fields: FieldConfig[];
  onClose: () => void;
  onSubmit: (data: T) => void;
  title?: string;
  confirmText?: string;
}

export default function RowFormModal<T extends Record<string, any>>({
  open,
  initialData,
  fields,
  onClose,
  onSubmit,
  title = 'Thêm / Sửa',
  confirmText = 'Lưu',
}: RowFormModalProps<T>) {
  const [form, setForm] = useState<T>((initialData as T) || ({} as T));

  useEffect(() => {
    setForm(initialData || ({} as T));
  }, [initialData]);

  const handleChange = (key: string, value: any) => {
    setForm((f) => ({ ...f, [key]: value }));
  };

  const columns = fields.length > 8 ? 3 : fields.length > 4 ? 2 : 1;
  const gridSize = 12 / columns;

  const renderField = (field: FieldConfig) => {
    const value = form[field.key] ?? '';

    return (
      <Grid item xs={12} sm={gridSize} key={field.key}>
        <Box mb={1}>
          <Typography fontWeight={600} mb={0.5} sx={{ color: 'inherit' }}>
            {field.label}
          </Typography>
          <TextField
            fullWidth
            type={field.type === 'password' ? 'password' : field.type || 'text'}
            placeholder={field.placeholder}
            size="small"
            variant="outlined"
            value={value}
            onChange={(e) =>
              handleChange(
                field.key,
                field.type === 'number' ? Number(e.target.value) : e.target.value,
              )
            }
          />
        </Box>
      </Grid>
    );
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: { p: 3, borderRadius: 3 },
      }}
    >
      <DialogTitle sx={{ fontWeight: 700, fontSize: '1.5rem', color: 'primary.main' }}>
        {title}
      </DialogTitle>

      <DialogContent sx={{ p: 3 }}>
        <Grid container spacing={2}>
          {fields.map(renderField)}
        </Grid>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={onClose} color="inherit">
          Hủy
        </Button>
        <Button variant="contained" color="primary" onClick={() => onSubmit(form)}>
          {confirmText}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
