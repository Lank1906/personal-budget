import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
} from '@mui/material';

export type FieldConfig = {
  key: string;
  label: string;
  type?: 'text' | 'number' | 'date' | 'select';
  options?: string[];
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
  title = 'Edit / Add',
  confirmText = 'Save',
}: RowFormModalProps<T>) {
  const [form, setForm] = useState<T>((initialData as T) || ({} as T));

  useEffect(() => {
    if (initialData) setForm(initialData);
    else setForm({} as T);
  }, [initialData]);

  const handleChange = (key: string, value: any) => {
    setForm((f) => ({ ...f, [key]: value }));
  };

  const handleSubmit = () => {
    onSubmit(form);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      {title && <DialogTitle>{title}</DialogTitle>}
      <DialogContent dividers sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
        {fields.map((field) => {
          const value = form[field.key] ?? '';
          if (field.type === 'select' && field.options) {
            return (
              <TextField
                key={field.key}
                select
                label={field.label}
                value={value}
                onChange={(e) => handleChange(field.key, e.target.value)}
              >
                {field.options.map((opt) => (
                  <MenuItem key={opt} value={opt}>
                    {opt}
                  </MenuItem>
                ))}
              </TextField>
            );
          }
          return (
            <TextField
              key={field.key}
              label={field.label}
              type={field.type || 'text'}
              value={value}
              onChange={(e) =>
                handleChange(
                  field.key,
                  field.type === 'number' ? Number(e.target.value) : e.target.value,
                )
              }
              InputLabelProps={field.type === 'date' ? { shrink: true } : undefined}
            />
          );
        })}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSubmit}>
          {confirmText}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
