export function getDuration(startTime: any, endTime: any) {
  const start: any = new Date(startTime);
  const end: any = new Date(endTime);
  const timeDifference = end - start;
  // Convert the duration to hours and minutes
  const hours = Math.floor(timeDifference / (1000 * 60 * 60));
  const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));

  // Format the duration as hours and minutes
  const formattedDuration = `${hours}h ${minutes}min`;
  return formattedDuration;
}
