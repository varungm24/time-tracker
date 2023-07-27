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

export function getEndTime(startTime: any, formattedDuration: any) {
  const start = new Date(startTime);
  const [hours, minutes] = formattedDuration.split("h ");

  // Calculate the total time difference in milliseconds
  const timeDifference = (parseInt(hours) * 60 + parseInt(minutes)) * 60 * 1000;
  // Calculate the new endTime
  const endTime = new Date(start.getTime() + timeDifference)
    .toLocaleString("sv")
    .replace("Z", "")
    .replace(" ", "T");

  return endTime;
}
