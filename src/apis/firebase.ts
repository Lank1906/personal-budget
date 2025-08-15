import { toast } from 'react-toastify';
import { CallApiOptions } from '../types/api';
import { setGlobalLoading } from '../hooks/useGlobalLoading';

export async function callFirebaseApi({
  action,
  successFn,
  failFn,
  successMessage,
  errorMessage,
  disableToast = true,
}: CallApiOptions): Promise<{ success: boolean; data?: any; error?: any }> {
  try {
    if (!action) throw new Error('No action provided');
    setGlobalLoading(true);
    const data = await action();

    if (successFn) successFn(data);

    if (!disableToast && successMessage) {
      toast.success(successMessage);
    }

    return { success: true, data };
  } catch (err: any) {
    if (failFn) failFn(err);

    if (!disableToast && errorMessage) {
      toast.error(errorMessage);
    }

    return { success: false, error: err };
  } finally {
    setGlobalLoading(false);
  }
}
