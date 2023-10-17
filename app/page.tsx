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
import { Checkbox } from "@/components/ui/checkbox";
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
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { flightss, locations } from "@/constants";
import { CheckedState } from "@radix-ui/react-checkbox";
import {
  ArrowRight,
  Calendar as CalendarIcon,
  Check,
  ChevronsUpDown,
  Filter,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";

const Home = () => {
  const [fromValue, setFromValue] = useState("");
  const [fromOpen, setFromOpen] = useState(false);
  const [toValue, setToValue] = useState("");
  const [toOpen, setToOpen] = useState(false);
  const [dateValue, setDateValue] = useState<Date>();
  const [flights, setFlights] = useState<typeof flightss | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [jetAirChecked, setJetAirChecked] = useState<CheckedState>(false);
  const [spiceJetChecked, setSpiceJetChecked] = useState<CheckedState>(false);
  const [vistaraChecked, setVistaraChecked] = useState<CheckedState>(false);

  const handleFlights = () => {
    const filteredFlights = flightss.filter(
      (flight) => flight.from === fromValue && flight.to === toValue
    );
    setFlights(filteredFlights);
  };

  return (
    <main>
      <Card className="max-[1200px]:rounded-none">
        <CardHeader className="relative">
          <CardTitle>Search Flights</CardTitle>
          <CardDescription>
            Select your origin and destination here
          </CardDescription>
          <Dialog open={filterOpen} onOpenChange={setFilterOpen}>
            <DialogTrigger asChild>
              <Button className="absolute right-8 top-4 flex items-center justify-center">
                <Filter />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Filter</DialogTitle>
                <DialogDescription>
                  Filter your flights by airlines.
                </DialogDescription>
              </DialogHeader>
              <div>
                <h3 className="font-[500] text-xl">Airline</h3>
                <div className="flex flex-col gap-2 px-4 mt-2">
                  <div className="flex gap-2 items-center">
                    <Checkbox
                      id="jetair"
                      checked={jetAirChecked === true}
                      onCheckedChange={setJetAirChecked}
                      onChange={(e) => console.log("e")}
                    />
                    <Label htmlFor="jetair">Jet Airways</Label>
                  </div>
                  <div className="flex gap-2 items-center">
                    <Checkbox
                      id="vistara"
                      checked={vistaraChecked === true}
                      onCheckedChange={setVistaraChecked}
                    />
                    <Label htmlFor="vistara">Vistara</Label>
                  </div>
                  <div className="flex gap-2 items-center">
                    <Checkbox
                      id="spicejet"
                      checked={spiceJetChecked === true}
                      onCheckedChange={setSpiceJetChecked}
                    />
                    <Label htmlFor="spicejet">SpiceJet</Label>
                  </div>
                </div>
              </div>
              <DialogFooter className="gap-2">
                <Button
                  onClick={() => {
                    const checked: string[] = [];
                    jetAirChecked === true && checked.push("Jet Airways");
                    spiceJetChecked === true && checked.push("SpiceJet");
                    vistaraChecked === true && checked.push("Vistara");

                    const filteredFlights = flights?.filter((flight) =>
                      checked.includes(flight.name)
                    );
                    if (!filteredFlights) return setFilterOpen(false);

                    setFlights(filteredFlights);

                    setFilterOpen(false);
                  }}
                >
                  Filter
                </Button>
                <Button
                  onClick={() => {
                    setFilterOpen(false);
                  }}
                >
                  Close
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
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
                <CommandGroup value="From">
                  {locations.map((location) => (
                    <CommandItem
                      key={location}
                      value={location}
                      onSelect={(value) => {
                        setFromValue(value);
                        setFromOpen(false);
                      }}
                      className="gap-2"
                    >
                      {fromValue === location.toLowerCase() && (
                        <Check width={15} height={15} />
                      )}
                      {location.toUpperCase()}
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
                <CommandGroup value="To">
                  {locations.map((location) => (
                    <CommandItem
                      key={location}
                      value={location}
                      onSelect={(value) => {
                        setToValue(value);
                        setToOpen(false);
                      }}
                      className="gap-2"
                    >
                      {toValue === location.toLowerCase() && (
                        <Check width={15} height={15} />
                      )}
                      {location.toUpperCase()}
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
            {flights.map((flight, i) => (
              <Card key={flight.name + i}>
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
                  <Button onClick={() => setDialogOpen(true)}>Book</Button>
                </CardFooter>
              </Card>
            ))}
          </CardContent>
        </Card>
      )}

      <Dialog onOpenChange={setDialogOpen} open={dialogOpen}>
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
      </Dialog>

      <Tabs defaultValue="food" className="mt-10 px-5">
        <TabsList className="bg-transparent gap-5">
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
        <TabsContent
          value="food"
          className="flex gap-10 mt-0 max-sm:flex-col max-sm:items-center"
        >
          <Card className="overflow-hidden border-none w-[256px] mt-5">
            <Image src="/food-1.avif" alt="food" width={256} height={256} />
            <CardHeader>
              <CardTitle className="mt-5">6E Eats</CardTitle>
              <CardDescription>
                Delectable prepaprations now on-board. Bookings open!
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className="overflow-hidden border-none w-[256px] mt-5">
            <Image src="/food-2.avif" alt="food" width={256} height={256} />
            <CardHeader>
              <CardTitle className="mt-5">One for the skies</CardTitle>
              <CardDescription>
                Pre-book your favorite alcoholic beverage.
              </CardDescription>
            </CardHeader>
          </Card>
        </TabsContent>
        <TabsContent
          value="baggage"
          className="flex gap-10 mt-0 max-sm:flex-col max-sm:items-center"
        >
          <Card className="overflow-hidden border-none w-[256px] mt-5">
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
          <Card className="overflow-hidden border-none w-[256px] mt-5">
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
        <TabsContent
          value="combo"
          className="flex gap-10 mt-0 max-sm:flex-col max-sm:items-center"
        >
          <Card className="overflow-hidden border-none w-[256px] mt-5">
            <Image src="/combo-1.avif" alt="combo" width={256} height={256} />
            <CardHeader>
              <CardTitle className="mt-5">6E Prime</CardTitle>
              <CardDescription>
                Get a preferred seat, snack combo, priority check-in and anytime
                boarding – all in one.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className="overflow-hidden border-none w-[256px] mt-5">
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
    </main>
  );
};
export default Home;
