export function addTime(
  date: Date | string | number,
  amount: number,
  unit: 'days' | 'months' | 'years' | 'hours' | 'minutes' | 'seconds',
): Date {
  const d = new Date(date);

  switch (unit) {
    case 'days':
      d.setDate(d.getDate() + amount);
      break;
    case 'months':
      d.setMonth(d.getMonth() + amount);
      break;
    case 'years':
      d.setFullYear(d.getFullYear() + amount);
      break;
    case 'hours':
      d.setHours(d.getHours() + amount);
      break;
    case 'minutes':
      d.setMinutes(d.getMinutes() + amount);
      break;
    case 'seconds':
      d.setSeconds(d.getSeconds() + amount);
      break;
    default:
      throw new Error('Unit không hợp lệ');
  }

  return d;
}

export function getWeekdayCountInMonth(month: number, year: number) {
  const weekdaysCount: Record<string, number> = {
    Mon: 0, // Thứ 2
    Tue: 0, // Thứ 3
    Wed: 0, // Thứ 4
    Thu: 0, // Thứ 5
    Fri: 0, // Thứ 6
    Sat: 0, // Thứ 7
    Sun: 0, // Chủ nhật
  };

  const daysInMonth = new Date(year, month, 0).getDate();

  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month - 1, day);
    const dayName = date.toLocaleDateString('en-US', { weekday: 'short' }); // Mon, Tue...
    weekdaysCount[dayName]++;
  }

  return weekdaysCount;
}

export function getStartOfMonth(date: Date | string | number): Date {
  const d = new Date(date);
  return new Date(d.getFullYear(), d.getMonth(), 1, 0, 0, 0, 0);
}

export function getEndOfMonth(date: Date | string | number): Date {
  const d = new Date(date);
  return new Date(d.getFullYear(), d.getMonth() + 1, 0, 23, 59, 59, 999);
}

export function getDaysInMonth(date: Date | string | number): number {
  const d = new Date(date);
  return new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate();
}
