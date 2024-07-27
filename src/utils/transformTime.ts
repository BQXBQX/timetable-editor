export const transformTime = (startTime: string, endTime: string): string => {
  const startDate: Date = new Date(startTime);
  const endDate: Date = new Date(endTime);

  const startMonth = startDate.getMonth();
  const startDay = startDate.getDate();
  const endMonth = endDate.getMonth();
  const endDay = endDate.getDate();

  const startHour = startDate.getHours();
  const startMinute = startDate.getMinutes();
  const endHour = endDate.getHours();
  const endMinute = endDate.getMinutes();

  return startMonth + startDay === endMonth + endDay
    ? ` ${startMonth}.${startDay} ${startHour}:${startMinute} ~ ${endHour}:${endMinute}`
    : ` ${startMonth}.${startDay} ${startHour}:${startMinute} ~ ${endMonth}.${endDay} ${endHour}:${endMinute}`;
};
