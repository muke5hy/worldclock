import { useEffect, useState } from "react";
import { getTimeForTimezone } from "@/utils/clockUtils";

interface AnalogClockProps {
    timezone: string;
    size?: "small" | "medium" | "large";
}

export const AnalogClock = ({ timezone, size = "medium" }: AnalogClockProps) => {
    const [time, setTime] = useState(getTimeForTimezone(timezone));

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(getTimeForTimezone(timezone));
        }, 1000);

        return () => clearInterval(interval);
    }, [timezone]);

    const sizeClasses = {
        small: "w-24 h-24",
        medium: "w-40 h-40",
        large: "w-56 h-56"
    };

    const hourRotation = `rotate(${(time.hours % 12) * 30 + time.minutes * 0.5}deg)`;
    const minuteRotation = `rotate(${time.minutes * 6}deg)`;
    const secondRotation = `rotate(${time.seconds * 6}deg)`;

    return (
        <div className={`relative ${sizeClasses[size]} rounded-full bg-white shadow-lg border border-gray-200`}>
            {/* Clock face */}
            <div className="absolute inset-0 rounded-full flex items-center justify-center">
                {/* Hour markers */}
                {[...Array(12)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-1.5 h-4 bg-gray-800"
                        style={{
                            transform: `rotate(${i * 30}deg) translateY(-50%)`,
                            top: "50%",
                            left: "calc(50% - 0.75px)",
                            transformOrigin: "center calc(100% - 1.7rem)"
                        }}
                    />
                ))}

                {/* Minute markers */}
                {[...Array(60)].map((_, i) => (
                    i % 5 !== 0 && (
                        <div
                            key={i}
                            className="absolute w-0.5 h-2 bg-gray-400"
                            style={{
                                transform: `rotate(${i * 6}deg) translateY(-50%)`,
                                top: "50%",
                                left: "calc(50% - 0.25px)",
                                transformOrigin: "center calc(100% - 1.7rem)"
                            }}
                        />
                    )
                ))}

                {/* Hour hand */}
                <div
                    className="absolute w-1.5 rounded-full bg-gray-800 z-20"
                    style={{
                        height: size === "small" ? "20%" : size === "medium" ? "25%" : "30%",
                        top: size === "small" ? "30%" : size === "medium" ? "25%" : "20%",
                        left: "calc(50% - 0.75px)",
                        transformOrigin: "center bottom",
                        transform: hourRotation
                    }}
                />

                {/* Minute hand */}
                <div
                    className="absolute w-1 rounded-full bg-gray-600 z-10"
                    style={{
                        height: size === "small" ? "30%" : size === "medium" ? "35%" : "40%",
                        top: size === "small" ? "20%" : size === "medium" ? "15%" : "10%",
                        left: "calc(50% - 0.5px)",
                        transformOrigin: "center bottom",
                        transform: minuteRotation
                    }}
                />

                {/* Second hand */}
                <div
                    className="absolute w-0.5 rounded-full bg-purple-600 z-30"
                    style={{
                        height: size === "small" ? "35%" : size === "medium" ? "40%" : "45%",
                        top: size === "small" ? "15%" : size === "medium" ? "10%" : "5%",
                        left: "calc(50% - 0.25px)",
                        transformOrigin: "center bottom",
                        transform: secondRotation
                    }}
                />

                {/* Center cap */}
                <div className="absolute w-3 h-3 bg-purple-500 rounded-full z-40" />
            </div>
        </div>
    );
};
