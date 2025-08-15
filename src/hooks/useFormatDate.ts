import { useCallback } from 'react';

export function useDateFormat() {
  const formatDate = useCallback((date: Date | string | number, format: string) => {
    if (!date) return '';

    const d = new Date(date);
    if (isNaN(d.getTime())) return '';

    const map: Record<string, string> = {
      YYYY: d.getFullYear().toString(),
      MM: String(d.getMonth() + 1).padStart(2, '0'),
      DD: String(d.getDate()).padStart(2, '0'),
      HH: String(d.getHours()).padStart(2, '0'),
      mm: String(d.getMinutes()).padStart(2, '0'),
      ss: String(d.getSeconds()).padStart(2, '0'),
    };

    let result = format;
    Object.entries(map).forEach(([key, value]) => {
      result = result.replace(key, value);
    });

    return result;
  }, []);

  return { formatDate };
}
