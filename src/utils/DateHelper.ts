export const formatDate = (date: Date, locale?: string) => {
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const year = date.getFullYear().toString();
  switch (locale) {
    case 'en-US':
      return `${month}/${day}/${year}`;
    case 'fr':
      return `${day}/${month}/${year}`;
    default:
      return `${day}/${month}/${year}`;
  }
};

export const formatDateForBackend = (date?: Date) => {
  if (date !== undefined) {
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const year = date.getFullYear().toString();
    return `${year}-${month}-${day}`;
  }
};

export const formatDateUTCForBackend = (date?: Date) => {
  if (date !== undefined) {
    const dateObject = new Date(date);
    const utcString = dateObject.toISOString();
    return utcString;
  }
};

export const formatDateFromBackend = (date?: string) => {
  if (date !== undefined) {
    // Split the input date into an array
    var splittedDate = date.split('T');

    var parts = splittedDate[0].split('-');
    // Rearrange the array elements to the desired format
    var formattedDate = `${parts[2]}-${parts[1]}-${parts[0]}`;

    return formattedDate;
  }
};

export const isTimeBefore = (time1: string, time2: string) => {
  if (!time1 || !time2) {
    // Handle the case where either time is undefined
    return false;
  }

  const [hours1, minutes1] = time1.split(':').map(Number);
  const [hours2, minutes2] = time2.split(':').map(Number);

  if (hours1 < hours2 || (hours1 === hours2 && minutes1 < minutes2)) {
    return true;
  }

  return false;
};

export const convertTimeToDateTimeString = (timeString: string) => {
  const currentDate = new Date();
  // Extract hours and minutes from the time string
  const [hours, minutes] = timeString.split(':').map(Number);
  // Set the time part of the current date
  currentDate.setHours(hours);
  currentDate.setMinutes(minutes);
  return formatDateUTCForBackend(currentDate);
};

export const convertDateTimeToTimeString = (dateTimeString: string): string => {
  const dateObject = new Date(dateTimeString);
  const hours = dateObject.getHours().toString().padStart(2, '0');
  const minutes = dateObject.getMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
};

export const compareDates = (date1: Date, date2: Date, method: 'same' | 'before' | 'after') => {
  date1.setHours(0, 0, 0, 0);
  date2.setHours(0, 0, 0, 0);
  switch (method) {
    case 'same':
      return (
        date1.getFullYear() === date2.getFullYear() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getDate() === date2.getDate()
      );
    case 'before':
      return date1 > date2;
    case 'after':
      return date1 < date2;
    default:
      return false;
  }
};
