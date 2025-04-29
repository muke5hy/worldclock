import { Clock, MapPin, Trash2 } from "lucide-react";
import type { ClockData } from "@/types/clock";
import { AnalogClock } from "./AnalogClock";
import { DigitalClock } from "./DigitalClock";
import { formatInTimeZone, toZonedTime } from "date-fns-tz";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { useState, useEffect } from "react";

interface ClockCardProps {
    clock: ClockData;
    onRemove: (id: string) => void;
}

export const ClockCard = ({ clock, onRemove }: ClockCardProps) => {
    const [date, setDate] = useState("");

    useEffect(() => {
        const updateDate = () => {
            const now = new Date();
            const zonedDate = toZonedTime(now, clock.timezone);
            setDate(formatInTimeZone(zonedDate, clock.timezone, "EEEE, MMM d"));
        };

        updateDate();
        const interval = setInterval(updateDate, 60000); // Update every minute

        return () => clearInterval(interval);
    }, [clock.timezone]);

    return (
        <Card className="w-full max-w-sm bg-white shadow-md hover:shadow-lg transition-shadow">
            <CardHeader className="pb-1">
                <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium">{clock.name}</h3>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onRemove(clock.id)}
                        className="text-red-500 hover:text-red-700 hover:bg-red-50"
                    >
                        <Trash2 className="h-4 w-4" />
                    </Button>
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                    <MapPin className="h-3.5 w-3.5 mr-1" /> {clock.country}
                </div>
            </CardHeader>

            <CardContent className="flex flex-col items-center py-4">
                <AnalogClock timezone={clock.timezone} size="medium" />
                <div className="mt-4 text-center">
                    <DigitalClock timezone={clock.timezone} className="text-3xl font-bold" />
                    <div className="text-sm text-muted-foreground mt-1">{date}</div>
                </div>
            </CardContent>

            <CardFooter className="pt-0 pb-3">
                <div className="w-full flex items-center text-xs text-muted-foreground">
                    <Clock className="h-3.5 w-3.5 mr-1" />
                    <span>Timezone: {clock.timezone}</span>
                </div>
            </CardFooter>
        </Card>
    );
};
