import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { ClockData } from "@/types/clock";
import { timezones } from "@/data/timezones";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Check, ChevronsUpDown, Globe } from "lucide-react";
import { cn } from "@/lib/utils";
import { addClock } from "@/utils/storage";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface AddClockDialogProps {
    onAdd: (clock: ClockData) => void;
}

export const AddClockDialog = ({ onAdd }: AddClockDialogProps) => {
    const [open, setOpen] = useState(false);
    const [name, setName] = useState("");
    const [popoverOpen, setPopoverOpen] = useState(false);
    const [selectedTimezone, setSelectedTimezone] = useState<string | null>(null);
    const [selectionMethod, setSelectionMethod] = useState<"timezone" | "country">("timezone");

    // Create a list of unique countries
    const countries = Array.from(new Set(timezones.map(tz => tz.country))).sort();

    const handleAdd = () => {
        if (!name.trim() || !selectedTimezone) return;

        const timezone = timezones.find(tz => tz.value === selectedTimezone);
        if (!timezone) return;

        const newClock: ClockData = {
            id: crypto.randomUUID(),
            name: name.trim(),
            timezone: timezone.value,
            country: timezone.country,
            shortForm: timezone.shortForm,
            dateAdded: new Date().toISOString()
        };

        // Add to local storage
        addClock(newClock);

        // Call the onAdd callback
        onAdd(newClock);

        // Reset the form
        setName("");
        setSelectedTimezone(null);
        setOpen(false);
    };

    // Filter timezones by country
    const handleCountrySelect = (country: string) => {
        // Get the first timezone for the selected country
        const firstTimezoneForCountry = timezones.find(tz => tz.country === country);
        if (firstTimezoneForCountry) {
            setSelectedTimezone(firstTimezoneForCountry.value);
        }
        setPopoverOpen(false);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="default" className="bg-purple-600 hover:bg-purple-700 flex items-center gap-2">
                    <Globe className="h-4 w-4" />
                    Add New Clock
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add New Clock</DialogTitle>
                    <DialogDescription>
                        Enter a name and select a location to add a new clock to your collection.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                            Name
                        </Label>
                        <Input
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="col-span-3"
                            placeholder="E.g., Home, Office, Tokyo Office"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label className="text-right">
                            Location
                        </Label>
                        <div className="col-span-3">
                            <Tabs defaultValue="timezone" className="w-full" onValueChange={(value) => setSelectionMethod(value as "timezone" | "country")}>
                                <TabsList className="grid w-full grid-cols-2">
                                    <TabsTrigger value="timezone">By Timezone</TabsTrigger>
                                    <TabsTrigger value="country">By Country</TabsTrigger>
                                </TabsList>
                                <TabsContent value="timezone" className="mt-2">
                                    <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
                                        <PopoverTrigger asChild>
                                            <Button
                                                variant="outline"
                                                role="combobox"
                                                aria-expanded={popoverOpen}
                                                className="w-full justify-between"
                                            >
                                                {selectedTimezone
                                                    ? timezones.find((tz) => tz.value === selectedTimezone)?.label
                                                    : "Select timezone..."}
                                                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-[300px] p-0">
                                            <Command>
                                                <CommandInput placeholder="Search timezone..." />
                                                <CommandList className="max-h-[300px]">
                                                    <CommandEmpty>No timezone found.</CommandEmpty>
                                                    <CommandGroup>
                                                        {timezones.map((tz) => (
                                                            <CommandItem
                                                                key={tz.value}
                                                                onSelect={() => {
                                                                    setSelectedTimezone(tz.value);
                                                                    setPopoverOpen(false);
                                                                }}
                                                            >
                                                                <Check
                                                                    className={cn(
                                                                        "mr-2 h-4 w-4",
                                                                        selectedTimezone === tz.value ? "opacity-100" : "opacity-0"
                                                                    )}
                                                                />
                                                                {tz.label} ({tz.country}) <span className="ml-1 text-xs font-semibold text-gray-500">{tz.shortForm}</span>
                                                            </CommandItem>
                                                        ))}
                                                    </CommandGroup>
                                                </CommandList>
                                            </Command>
                                        </PopoverContent>
                                    </Popover>
                                </TabsContent>
                                <TabsContent value="country" className="mt-2">
                                    <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
                                        <PopoverTrigger asChild>
                                            <Button
                                                variant="outline"
                                                role="combobox"
                                                aria-expanded={popoverOpen}
                                                className="w-full justify-between"
                                            >
                                                {selectedTimezone
                                                    ? timezones.find((tz) => tz.value === selectedTimezone)?.country
                                                    : "Select country..."}
                                                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-[300px] p-0">
                                            <Command>
                                                <CommandInput placeholder="Search country..." />
                                                <CommandList className="max-h-[300px]">
                                                    <CommandEmpty>No country found.</CommandEmpty>
                                                    <CommandGroup>
                                                        {countries.map((country) => (
                                                            <CommandItem
                                                                key={country}
                                                                onSelect={() => handleCountrySelect(country)}
                                                            >
                                                                <Check
                                                                    className={cn(
                                                                        "mr-2 h-4 w-4",
                                                                        selectedTimezone && timezones.find((tz) => tz.value === selectedTimezone)?.country === country
                                                                            ? "opacity-100"
                                                                            : "opacity-0"
                                                                    )}
                                                                />
                                                                {country}
                                                            </CommandItem>
                                                        ))}
                                                    </CommandGroup>
                                                </CommandList>
                                            </Command>
                                        </PopoverContent>
                                    </Popover>

                                    {/* If country is selected, show the timezones for that country */}
                                    {selectedTimezone && selectionMethod === "country" && (
                                        <div className="mt-2">
                                            <Label className="text-sm mb-1 block">City/Timezone in {timezones.find(tz => tz.value === selectedTimezone)?.country}</Label>
                                            <Select
                                                value={selectedTimezone}
                                                onValueChange={setSelectedTimezone}
                                            >
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="Select city..." />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {timezones
                                                        .filter(tz => tz.country === timezones.find(t => t.value === selectedTimezone)?.country)
                                                        .map(tz => (
                                                            <SelectItem key={tz.value} value={tz.value}>
                                                                {tz.label} <span className="ml-1 text-xs font-semibold text-gray-500">({tz.shortForm})</span>
                                                            </SelectItem>
                                                        ))
                                                    }
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    )}
                                </TabsContent>
                            </Tabs>
                        </div>
                    </div>
                </div>
                <DialogFooter>
                    <Button
                        onClick={handleAdd}
                        disabled={!name.trim() || !selectedTimezone}
                        className="bg-purple-600 hover:bg-purple-700"
                    >
                        Save Clock
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
