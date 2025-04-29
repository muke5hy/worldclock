export interface Timezone {
    value: string;
    label: string;
    country: string;
    shortForm: string; // Short timezone code
}

export const timezones: Timezone[] = [
    { value: "America/New_York", label: "New York", country: "United States", shortForm: "EST/EDT" },
    { value: "America/Los_Angeles", label: "Los Angeles", country: "United States", shortForm: "PST/PDT" },
    { value: "America/Chicago", label: "Chicago", country: "United States", shortForm: "CST/CDT" },
    { value: "America/Denver", label: "Denver", country: "United States", shortForm: "MST/MDT" },
    { value: "Europe/London", label: "London", country: "United Kingdom", shortForm: "GMT/BST" },
    { value: "Europe/Paris", label: "Paris", country: "France", shortForm: "CET/CEST" },
    { value: "Europe/Berlin", label: "Berlin", country: "Germany", shortForm: "CET/CEST" },
    { value: "Europe/Madrid", label: "Madrid", country: "Spain", shortForm: "CET/CEST" },
    { value: "Europe/Rome", label: "Rome", country: "Italy", shortForm: "CET/CEST" },
    { value: "Asia/Tokyo", label: "Tokyo", country: "Japan", shortForm: "JST" },
    { value: "Asia/Shanghai", label: "Shanghai", country: "China", shortForm: "CST" },
    { value: "Asia/Singapore", label: "Singapore", country: "Singapore", shortForm: "SGT" },
    { value: "Asia/Dubai", label: "Dubai", country: "United Arab Emirates", shortForm: "GST" },
    { value: "Asia/Kolkata", label: "Mumbai", country: "India", shortForm: "IST" },
    { value: "Australia/Sydney", label: "Sydney", country: "Australia", shortForm: "AEST/AEDT" },
    { value: "Pacific/Auckland", label: "Auckland", country: "New Zealand", shortForm: "NZST/NZDT" },
    { value: "America/Sao_Paulo", label: "São Paulo", country: "Brazil", shortForm: "BRT/BRST" },
    { value: "Africa/Johannesburg", label: "Johannesburg", country: "South Africa", shortForm: "SAST" },
    { value: "Africa/Cairo", label: "Cairo", country: "Egypt", shortForm: "EET" },
];

export const findTimezoneByValue = (value: string): Timezone | undefined => {
    return timezones.find((tz) => tz.value === value);
};
