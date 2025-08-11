export interface CallApiOptions<T = any> {
  action: () => Promise<T>; // Hàm async trả về dữ liệu kiểu T
  successFn?: (data?: T) => void; // Callback thành công (data cùng kiểu T)
  failFn?: (error?: any) => void; // Callback thất bại (error có thể là bất cứ kiểu gì)
  successMessage?: string; // Toast khi thành công
  errorMessage?: string; // Toast khi lỗi
  disableToast?: boolean; // Tắt toast
}
