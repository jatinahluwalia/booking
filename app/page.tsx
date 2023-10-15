"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  ArrowRight,
  Calendar as CalendarIcon,
  ChevronsUpDown,
} from "lucide-react";
import { useState } from "react";

const locations = ["Delhi", "Mumbai"];

const Home = () => {
  const [fromValue, setFromValue] = useState("");
  const [fromOpen, setFromOpen] = useState(false);
  const [toValue, setToValue] = useState("");
  const [toOpen, setToOpen] = useState(false);
  const [dateValue, setDateValue] = useState<Date>();
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Search Flights</CardTitle>
          <CardDescription>
            Select your origin and destination here
          </CardDescription>
        </CardHeader>
        <CardContent className="flex gap-5 items-center">
          <Popover open={fromOpen} onOpenChange={setFromOpen}>
            <PopoverTrigger asChild className="grow">
              <Button variant={"outline"} className="w-[300px] justify-between">
                {fromValue ? fromValue.toLocaleUpperCase() : "From...."}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[300px] p-0">
              <Command>
                <CommandInput placeholder="Search places..." />
                <CommandEmpty>No such place</CommandEmpty>
                <CommandGroup>
                  {locations.map((location) => (
                    <CommandItem
                      key={location}
                      onSelect={(value) => {
                        setFromValue(value);
                        setFromOpen(false);
                      }}
                    >
                      {location}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>
          <ArrowRight />
          <Popover open={toOpen} onOpenChange={setToOpen}>
            <PopoverTrigger asChild className="grow">
              <Button variant={"outline"} className="w-[300px] justify-between">
                {toValue ? toValue.toLocaleUpperCase() : "To...."}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[300px] p-0">
              <Command>
                <CommandInput placeholder="Search places..." />
                <CommandEmpty>No such place</CommandEmpty>
                <CommandGroup>
                  {locations.map((location) => (
                    <CommandItem
                      key={location}
                      onSelect={(value) => {
                        setToValue(value);
                        setToOpen(false);
                      }}
                    >
                      {location}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                className="w-[300px] justify justify-between grow"
                variant={"outline"}
              >
                {dateValue?.toDateString() || "Select Date..."}
                <CalendarIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="p-0 grid place-content-center">
              <Calendar
                selected={dateValue}
                onSelect={setDateValue}
                mode="single"
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </CardContent>
        <CardFooter className="flex flex-col items-stretch">
          <Button>Search Flights</Button>
        </CardFooter>
      </Card>
    </>
  );
};
export default Home;
