export type Row = Record<string, any>;

export type Column<RowType extends Row> = {
  key: string;
  header: React.ReactNode;
  sortable?: boolean;
  width?: string;
  render?: (value: any, row: RowType) => React.ReactNode;
  align?: 'left' | 'center' | 'right';
};

export type CustomTableProps<RowType extends Row> = {
  columns: Column<RowType>[];
  data: RowType[];
  initialSortBy?: { key: string; desc?: boolean } | null;
  pageSizeOptions?: number[];
  defaultPageSize?: number;
  className?: string;
  searchable?: boolean;
  selectable?: boolean;
  onSelectionChange?: (selected: RowType[]) => void;
  rowKey?: (row: RowType) => string | number;
  rowActions?: (row: RowType) => React.ReactNode;
};

export interface SearchBoxProps {
  placeholder?: string;
  onSearch: (query: string) => void;
}
