export const transformTime = (startTime: string, endTime: string): string => {
  const startDate: Date = new Date(startTime);
  const endDate: Date = new Date(endTime);

  const startMonth = startDate.getMonth() + 1;
  const startDay = startDate.getDate();
  const endMonth = endDate.getMonth() + 1;
  const endDay = endDate.getDate();

  const startHour = startDate.getHours();
  const startMinute = startDate.getMinutes().toString().padStart(2, "0");
  const endHour = endDate.getHours();
  const endMinute = endDate.getMinutes().toString().padStart(2, "0");

  return startMonth + startDay === endMonth + endDay
    ? ` ${startMonth}.${startDay} ${startHour}:${startMinute} ~ ${endHour}:${endMinute}`
    : ` ${startMonth}.${startDay} ${startHour}:${startMinute} ~ ${endMonth}.${endDay} ${endHour}:${endMinute}`;
};
