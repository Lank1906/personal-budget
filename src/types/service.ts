import { DocumentData, QueryDocumentSnapshot, WhereFilterOp } from 'firebase/firestore';

export interface Pagination {
  limit: number;
  startAfterDoc?: QueryDocumentSnapshot<DocumentData> | null;
}

export interface SearchOptions {
  filters?: { field: string; operator: WhereFilterOp; value: any }[];
  orderByField?: string;
  orderDirection?: 'asc' | 'desc';
  pagination?: Pagination;
}

export interface Callbacks {
  successFn?: (data: any) => void;
  failFn?: (error: any) => void;
}
