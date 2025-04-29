import { useEffect, useState } from "react";
import { formatInTimeZone, toZonedTime } from "date-fns-tz";

interface DigitalClockProps {
    timezone: string;
    format?: "12h" | "24h";
    showSeconds?: boolean;
    className?: string;
}

export const DigitalClock = ({
    timezone,
    format = "12h",
    showSeconds = true,
    className = ""
}: DigitalClockProps) => {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(new Date());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const formatString = format === "12h"
        ? (showSeconds ? 'h:mm:ss aa' : 'h:mm aa')
        : (showSeconds ? 'HH:mm:ss' : 'HH:mm');

    const zonedTime = toZonedTime(time, timezone);
    const formattedTime = formatInTimeZone(zonedTime, timezone, formatString);

    return (
        <div className={`font-mono text-2xl ${className}`}>
            {formattedTime}
        </div>
    );
};
