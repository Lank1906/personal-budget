import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  Grid,
  Paper,
} from '@mui/material';

export type FieldConfig = {
  key: string;
  label: string;
  type?: 'text' | 'number' | 'date' | 'select';
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

  const handleSubmit = () => {
    onSubmit(form);
    onClose();
  };

  const renderField = (field: FieldConfig) => {
    const value = form[field.key] ?? '';
    return (
      <Grid item xs={12} sm={6} key={field.key}>
        {field.type === 'select' && field.options ? (
          <TextField
            select
            fullWidth
            label={field.label}
            size="small"
            variant="outlined"
            value={value}
            onChange={(e) => handleChange(field.key, e.target.value)}
            InputLabelProps={{
              shrink: true,
              style: { fontSize: 14, fontWeight: 600, color: '#1976d2' },
            }}
          >
            {field.options.map((opt) => (
              <MenuItem key={opt} value={opt}>
                {opt}
              </MenuItem>
            ))}
          </TextField>
        ) : (
          <TextField
            fullWidth
            label={field.label}
            placeholder={field.placeholder}
            type={field.type || 'text'}
            size="small"
            variant="outlined"
            value={value}
            onChange={(e) =>
              handleChange(
                field.key,
                field.type === 'number' ? Number(e.target.value) : e.target.value,
              )
            }
            InputLabelProps={{
              shrink: true,
              style: { fontSize: 14, fontWeight: 600, color: '#1976d2' },
            }}
          />
        )}
      </Grid>
    );
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ fontWeight: 700, fontSize: '1.5rem', color: 'primary.main' }}>
        {title}
      </DialogTitle>

      <DialogContent dividers sx={{ p: 3 }}>
        <Paper elevation={2} sx={{ p: 3, borderRadius: 3 }}>
          <Grid container spacing={2}>
            {fields.map(renderField)}
          </Grid>
        </Paper>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={onClose} color="inherit">
          Hủy
        </Button>
        <Button variant="contained" onClick={handleSubmit}>
          {confirmText}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
