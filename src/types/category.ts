import { FieldConfig } from './form';

export type Category = {
  id: string;
  icon: string;
  name: string;
  budget: number;
  type: string;
  createdAt: Date;
  createdBy: string;
  spent: number;
};

export interface CategoryCardProps {
  category: Category;
  onDelete: (category: Category) => void;
  onUpdate: (category: Category) => void;
}

export const columns = [
  { key: 'icon', header: 'Icon', sortTable: true },
  { key: 'name', header: 'Name', sortTable: true },
  { key: 'budget', header: 'Budget', sortTable: true },
  { key: 'type', header: 'Type', sortTable: true },
];

export const fields: FieldConfig[] = [
  { key: 'icon', label: 'Icon', type: 'text' },
  { key: 'name', label: 'Name', type: 'text' },
  { key: 'budget', label: 'Budget', type: 'number' },
  { key: 'type', label: 'Type', type: 'select', options: ['income', 'expense'] },
];
