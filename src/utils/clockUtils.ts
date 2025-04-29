
import { format } from "date-fns";
import { formatInTimeZone, toZonedTime } from "date-fns-tz";

export const formatTime = (date: Date, timezone: string, formatStr: string): string => {
    const zonedDate = toZonedTime(date, timezone);
    return formatInTimeZone(zonedDate, timezone, formatStr);
};

export const getTimeForTimezone = (timezone: string): {
    hours: number;
    minutes: number;
    seconds: number;
    date: string;
} => {
    const now = new Date();
    const zonedDate = toZonedTime(now, timezone);

    return {
        hours: parseInt(format(zonedDate, 'H')),
        minutes: parseInt(format(zonedDate, 'm')),
        seconds: parseInt(format(zonedDate, 's')),
        date: format(zonedDate, 'MMM d, yyyy')
    };
};
