export interface ClockData {
    id: string;
    name: string;
    timezone: string;
    country: string;
    dateAdded: string;
    shortForm?: string; // Optional short timezone code like IST, PST, GMT
}
