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
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  if (businessHours.daysOpen.includes(days[today.getDate()])) {
    businessHours.hours.forEach(hourSet => {
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
