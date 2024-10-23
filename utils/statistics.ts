export const getThisWeekDates = (): string[] => {
  const dates = [];
  const today = new Date();
  const currentDayOfWeek = today.getDay();

  const daysSinceThisMonday = currentDayOfWeek === 0 ? 6 : currentDayOfWeek - 1;

  const thisMonday = new Date(today);
  thisMonday.setDate(today.getDate() - daysSinceThisMonday);

  for (let i = 0; i < 7; i++) {
    const date = new Date(thisMonday);
    date.setDate(thisMonday.getDate() + i);
    dates.push(date.toISOString().split('T')[0]);
  }

  return dates;
};

export const getLastWeekDates = (): string[] => {
  const dates = [];
  const today = new Date();
  const currentDayOfWeek = today.getDay();
  const daysSinceLastMonday = currentDayOfWeek === 0 ? 6 : currentDayOfWeek - 1;

  const lastMonday = new Date(today);
  lastMonday.setDate(today.getDate() - daysSinceLastMonday - 7);

  for (let i = 0; i < 7; i++) {
    const date = new Date(lastMonday);
    date.setDate(lastMonday.getDate() + i);
    dates.push(date.toISOString().split('T')[0]);
  }

  return dates;
};

export const getLastMonthDates = (): string[] => {
  const dates = [];
  const today = new Date();

  const firstDayOfCurrentMonth = new Date(
    today.getFullYear(),
    today.getMonth(),
    1,
  );

  const lastDayOfLastMonth = new Date(firstDayOfCurrentMonth);

  const firstDayOfLastMonth = new Date(
    lastDayOfLastMonth.getFullYear(),
    lastDayOfLastMonth.getMonth(),
    1,
  );
  lastDayOfLastMonth.setDate(firstDayOfLastMonth.getDate() - 1);

  for (
    let date = firstDayOfLastMonth;
    date <= lastDayOfLastMonth;
    date.setDate(date.getDate() + 1)
  ) {
    dates.push(new Date(date).toISOString().split('T')[0]);
  }

  return dates;
};
