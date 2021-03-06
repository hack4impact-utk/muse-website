import { BusinessHours } from "utils/types";
/**
 * Checks to see if the Muse is open based on the Business hours
 * @param businessHours the BusinessHours object returned from Contentful.
 * @returns true if open, false if not open.
 */
export const isOpen = (businessHours: BusinessHours): boolean => {
  const today = new Date();
  const tzOffsetHours = today.getTimezoneOffset() / 60; //Need to convert local time to UTC then to EST.
  //EST is 5 hours behind UTC, so subtracting 5 from the converted UTC time gets you EST.
  const todayHours = today.getHours() + tzOffsetHours - 5;
  let o = false;
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  if (businessHours.daysOpen?.includes(days[today.getDate()])) {
    businessHours.hours?.forEach(hourSet => {
      const [open, close] = parseHours(hourSet);
      if (
        todayHours >= open.hour &&
        today.getMinutes() >= open.mins &&
        todayHours <= close.hour
      ) {
        if (todayHours == close.hour && today.getMinutes() >= close.mins) {
          o = false;
        } else {
          o = true;
        }
      }
    });
  }
  return o;
};
/**
 * Parses the hours from a string of hours.
 * @param hours The string of hours returned by Contentful. (Ex: 12:00PM-4:00PM)
 * @returns an array containing the opening and closing hours as separate objects.
 */
export const parseHours = (
  hours: string
): [
  opening: { hour: number; mins: number },
  closing: { hour: number; mins: number }
] => {
  //Split the opening and closing hours.
  const [a, b] = hours.split("-");
  //Separates the opening and closing hours into hh:mm and AM/PM so they can be parsed.
  const [openTime, openAMPM] = a.split(/(?=[aApP][mM])/);
  const [closingTime, closingAMPM] = b.split(/(?=[aApP][mM])/);

  //This splits opening and closing hours into hh and mm
  const [openingHours, openingMinutes] = openTime.split(":");
  const [closingHours, closingMinutes] = closingTime.split(":");

  const opening = {
    //This will be in 24-hour time for easy number comparision later.
    hour:
      parseInt(openingHours) +
      (openAMPM.toLowerCase() == "pm" && parseInt(openingHours) != 12 ? 12 : 0),
    mins: parseInt(openingMinutes),
  };
  const closing = {
    hour:
      parseInt(closingHours) +
      (closingAMPM.toLowerCase() == "pm" && parseInt(closingHours) != 12
        ? 12
        : 0),
    mins: parseInt(closingMinutes),
  };

  return [opening, closing];
};

/**
 *  Compresses the days open.
 * @param daysOpen The business days that the Muse is open.
 * @returns A string expressing the days that the Muse is open.
 */
export const compressDays = (daysOpen: string[]): string => {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  enum Days {
    Sunday = 0,
    Monday,
    Tuesday,
    Wednesday,
    Thursday,
    Friday,
    Saturday, //6
  }
  ("");
  //Sort the days similar to how they are sorted above.
  const sorted = daysOpen.slice().sort((a: string, b: string) => {
    return days.indexOf(a) - days.indexOf(b);
  });
  let dayString = `${sorted[0]}`; //String to be concatenated to.
  //Check for gaps in days open. If the difference in day number between a day and the day after it is greater than 1, that means there's a gap.
  if (sorted.length > 1) {
    for (let i = 0; i < sorted.length - 1; i++) {
      if (
        Days[sorted[i + 1] as keyof typeof Days] -
          Days[sorted[i] as keyof typeof Days] >
        1
      ) {
        dayString = dayString.concat(`, ${sorted[i + 1]}`);
      } else {
        if (i == sorted.length - 2 && !dayString.includes(",")) {
          dayString = dayString.concat(`-${sorted[i + 1]}: `);
        } else if (i == sorted.length - 2 && dayString.includes(",")) {
          dayString = dayString.concat(`, ${sorted[i + 1]}: `);
        }
      }
    }
  } else {
    dayString = dayString.concat(": ");
  }

  return dayString;
};

export const isWeekend = (): boolean => {
  //! Should Saturday be considered a weekday or weekend?
  const today = new Date();
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const weekendDays = ["Sunday"];

  if (weekendDays.includes(days[today.getDate()])) {
    return true;
  }
  return false;
};
