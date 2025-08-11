export interface CallApiOptions<T = any> {
  action: () => Promise<T>;
  successFn?: (data?: T) => void;
  failFn?: (error?: any) => void;
  successMessage?: string;
  errorMessage?: string;
  disableToast?: boolean;
}
