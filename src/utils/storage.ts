
import { ClockData } from "../types/clock";

const STORAGE_KEY = "world-clock-data";

export const loadClocks = (): ClockData[] => {
    try {
        const data = localStorage.getItem(STORAGE_KEY);
        return data ? JSON.parse(data) : [];
    } catch (error) {
        console.error("Error loading clocks from localStorage:", error);
        return [];
    }
};

export const saveClocks = (clocks: ClockData[]): void => {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(clocks));
    } catch (error) {
        console.error("Error saving clocks to localStorage:", error);
    }
};

export const addClock = (clock: ClockData): void => {
    const clocks = loadClocks();
    saveClocks([...clocks, clock]);
};

export const removeClock = (id: string): void => {
    const clocks = loadClocks();
    saveClocks(clocks.filter((clock) => clock.id !== id));
};
