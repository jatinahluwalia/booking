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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowRight,
  Calendar as CalendarIcon,
  ChevronsUpDown,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";

const locations = ["delhi", "mumbai"];

const flightss = [
  {
    from: "delhi",
    to: "mumbai",
    date: new Date(2023, 10, 16),
    name: "Flight 1",
  },
  {
    from: "delhi",
    to: "mumbai",
    date: new Date(2023, 10, 17),
    name: "Flight 2",
  },
  {
    from: "delhi",
    to: "mumbai",
    date: new Date(2023, 10, 18),
    name: "Flight 3",
  },
  {
    from: "mumbai",
    to: "delhi",
    date: new Date(2023, 10, 16),
    name: "Flight 4",
  },
  {
    from: "mumbai",
    to: "delhi",
    date: new Date(2023, 10, 17),
    name: "Flight 5",
  },
  {
    from: "mumbai",
    to: "delhi",
    date: new Date(2023, 10, 18),
    name: "Flight 6",
  },
];

const Home = () => {
  const [fromValue, setFromValue] = useState("");
  const [fromOpen, setFromOpen] = useState(false);
  const [toValue, setToValue] = useState("");
  const [toOpen, setToOpen] = useState(false);
  const [dateValue, setDateValue] = useState<Date>();
  const [flights, setFlights] = useState<typeof flightss | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleFlights = () => {
    const filteredFlights = flightss.filter(
      (flight) => flight.from === fromValue && flight.to === toValue
    );
    setFlights(filteredFlights);
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Search Flights</CardTitle>
          <CardDescription>
            Select your origin and destination here
          </CardDescription>
        </CardHeader>
        <CardContent className="flex gap-5 items-center max-sm:flex-col max-sm:items-stretch">
          <Popover open={fromOpen} onOpenChange={setFromOpen}>
            <PopoverTrigger asChild className="grow">
              <Button variant={"outline"} className="justify-between">
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
                      {location.toLocaleUpperCase()}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>
          <ArrowRight className="max-sm:hidden" />
          <Popover open={toOpen} onOpenChange={setToOpen}>
            <PopoverTrigger asChild className="grow">
              <Button variant={"outline"} className="justify-between">
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
                      {location.toLocaleUpperCase()}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                className="justify justify-between grow"
                variant={"outline"}
              >
                {dateValue?.toLocaleDateString() || "Select Date..."}
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
          <Button onClick={handleFlights}>Search Flights</Button>
        </CardFooter>
      </Card>
      {flights && (
        <Card className="bg-transparent text-white border-none">
          <CardHeader>
            <CardTitle>Flights</CardTitle>
            <CardDescription className="text-gray-400">
              {flights.length} flights found for {fromValue} to {toValue}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-5">
            {flights.map((flight) => (
              <Dialog
                onOpenChange={setDialogOpen}
                open={dialogOpen}
                key={flight.name}
              >
                <Card>
                  <CardHeader>
                    <CardTitle>{flight.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-col gap-5">
                    <CardDescription>
                      {flight.from.toLocaleUpperCase()} to{" "}
                      {flight.to.toLocaleUpperCase()}
                    </CardDescription>
                    <CardDescription>
                      {flight.date.toLocaleDateString()}
                    </CardDescription>
                  </CardContent>
                  <CardFooter className="max-sm:flex-col max-sm:items-stretch">
                    <DialogTrigger asChild>
                      <Button>Book</Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Flight</DialogTitle>
                        <DialogDescription>
                          Your Flight Booked Successfully
                        </DialogDescription>
                      </DialogHeader>
                      <DialogFooter>
                        <Button
                          onClick={() => {
                            setDialogOpen(false);
                          }}
                        >
                          Close
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </CardFooter>
                </Card>
              </Dialog>
            ))}
          </CardContent>
        </Card>
      )}
      <Tabs defaultValue="food" className="mt-10">
        <TabsList className="bg-transparent">
          <TabsTrigger value="food" asChild>
            <Button variant={"ghost"} className="text-white">
              Food & Beverage
            </Button>
          </TabsTrigger>
          <TabsTrigger value="baggage" asChild>
            <Button variant={"ghost"} className="text-white">
              Baggage
            </Button>
          </TabsTrigger>
          <TabsTrigger value="combo" asChild>
            <Button variant={"ghost"} className="text-white">
              Combo
            </Button>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="food" className="flex gap-10">
          <Card className="overflow-hidden border-none w-[256px]">
            <Image src="/food-1.avif" alt="food" width={256} height={256} />
            <CardHeader>
              <CardTitle className="mt-5">6E Eats</CardTitle>
              <CardDescription>
                Delectable prepaprations now on-board. Bookings open!
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className="overflow-hidden border-none w-[256px]">
            <Image src="/food-2.avif" alt="food" width={256} height={256} />
            <CardHeader>
              <CardTitle className="mt-5">One for the skies</CardTitle>
              <CardDescription>
                Pre-book your favorite alcoholic beverage.
              </CardDescription>
            </CardHeader>
          </Card>
        </TabsContent>
        <TabsContent value="baggage" className="flex gap-10">
          <Card className="overflow-hidden border-none w-[256px]">
            <Image
              src="/baggage-1.avif"
              alt="baggage"
              width={256}
              height={256}
            />
            <CardHeader>
              <CardTitle className="mt-5">
                Excess Baggage/ Additional Piece
              </CardTitle>
              <CardDescription>
                Pre-book any excess check-in baggage and save up to 20%.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className="overflow-hidden border-none w-[256px]">
            <Image
              src="/baggage-2.avif"
              alt="baggage"
              width={256}
              height={256}
            />
            <CardHeader>
              <CardTitle className="mt-5">
                Delayed & Lost Baggage Protection
              </CardTitle>
              <CardDescription>
                Get compensated if your checked-in baggage is delayed, or lost.
              </CardDescription>
            </CardHeader>
          </Card>
        </TabsContent>
        <TabsContent value="combo" className="flex gap-10">
          <Card className="overflow-hidden border-none w-[256px]">
            <Image src="/combo-1.avif" alt="combo" width={256} height={256} />
            <CardHeader>
              <CardTitle className="mt-5">6E Prime</CardTitle>
              <CardDescription>
                Get a preferred seat, snack combo, priority check-in and anytime
                boarding – all in one.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className="overflow-hidden border-none w-[256px]">
            <Image src="/combo-2.avif" alt="combo" width={256} height={256} />
            <CardHeader>
              <CardTitle className="mt-5">6E Seat & Eat</CardTitle>
              <CardDescription>
                Get your preferred seat, and a snack combo on your next flight.
              </CardDescription>
            </CardHeader>
          </Card>
        </TabsContent>
      </Tabs>
    </>
  );
};
export default Home;
