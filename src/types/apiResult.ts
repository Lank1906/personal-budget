export type ApiResult<T = any> = Promise<{ success: boolean; data?: T; error?: any }>;
