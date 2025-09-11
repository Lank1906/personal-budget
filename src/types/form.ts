export type FieldConfig = {
  key: string;
  label: string;
  type?: 'text' | 'number' | 'date' | 'select';
  options?: string[];
};

export interface RowFormModalProps<T extends Record<string, any>> {
  open: boolean;
  initialData?: T;
  fields: FieldConfig[];
  onClose: () => void;
  onSubmit: (data: T) => void;
  title?: string;
  confirmText?: string;
}
