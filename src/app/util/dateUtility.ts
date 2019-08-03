/**
 * Returns the difference in minutes between two dates
 * 
 * @param {Date} date1 The first date
 * @param {Date} date2 The second date
 * @returns {number} The difference in minutes between date1 and date2
 */
export function getMinuteDifference(date1: Date, date2: Date): number
{ 
  let difference = date2.getTime() - date1.getTime();
  return Math.floor(difference / (60 * 1000)); 
}

/**
 * Returns the difference in hours between two dates
 * 
 * @param {Date} date1 The first date
 * @param {Date} date2 The second date
 * @returns {number} The difference in hours between date1 and date2
 */
export function getHourDifference(date1: Date, date2: Date): number
{ return Math.floor(getMinuteDifference(date1, date2) / 60); }

/**
 * Returns the difference in days between two dates
 * 
 * @param {Date} date1 The first date
 * @param {Date} date2 The second date
 * @returns {number} The difference in days between date1 and date2
 */
export function getDayDifference(date1: Date, date2: Date): number
{ return Math.floor(getHourDifference(date1, date2) / 24); }

/**
 * Returns the difference in weeks between two dates
 * 
 * @param {Date} date1 The first date
 * @param {Date} date2 The second date
 * @returns {number} The difference in weeks between date1 and date2
 */
export function getWeekDifference(date1: Date, date2: Date): number
{ return Math.floor(getDayDifference(date1, date2) / 7); }

/**
 * Returns the difference in months between two dates
 * 
 * @param {Date} date1 The first date
 * @param {Date} date2 The second date
 * @returns {number} The difference in months between date1 and date2
 */
export function getMonthDifference(date1: Date, date2: Date): number
{  
  return (date2.getMonth() + 12 * date2.getFullYear()) 
    - (date1.getMonth() + 12 * date1.getFullYear());
}

/**
 * Returns the difference in years between two dates
 * 
 * @param {Date} date1 The first date
 * @param {Date} date2 The second date
 * @returns {number} The difference in years between date1 and date2
 */
export function getYearDifference(date1: Date, date2: Date): number
{ return date2.getFullYear() - date1.getFullYear(); }

/**
 * Returns the difference between two dates as formatted string
 * 
 * @param {Date} date1 The first date
 * @param {Date} date2 The second date
 * @returns {string} The difference between two dates as formatted string
 */
export function getDateDifferenceString(date1: Date, date2: Date): string
{ 
  let difference = getYearDifference(date1, date2);
  if (difference > 0)
    return difference + "y";
  difference = getMonthDifference(date1, date2);
  if (difference > 0)
    return difference + "M";
  difference = getWeekDifference(date1, date2);
  if (difference > 0)
    return difference + "w";
  difference = getDayDifference(date1, date2);
  if (difference > 0)
    return difference + "d";
  difference = getHourDifference(date1, date2);
  if (difference > 0)
    return difference + "h";
  difference = getMinuteDifference(date1, date2);
  if (difference > 0)
    return difference + "m";
}