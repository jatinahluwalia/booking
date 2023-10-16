"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { useState } from "react";

const Navbar = () => {
  const [loginOpen, setLoginOpen] = useState(false);
  const [signupOpen, setSignupOpen] = useState(false);
  return (
    <nav className="flex justify-between items-center h-20 px-5">
      <Link href={"/"} className="flex items-center gap-2">
        <Image src={"/logo.png"} alt="logo" width={30} height={30} />
        <h1 className="text-white font-bold letter tracking-widest text-3xl">
          SIDG GO
        </h1>
      </Link>

      <div className="flex gap-2 items-center">
        <Dialog open={loginOpen} onOpenChange={setLoginOpen}>
          <DialogTrigger asChild>
            <Button variant={"link"} className="text-white">
              Login
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Login</DialogTitle>
              <DialogDescription>Login with your credentials</DialogDescription>
            </DialogHeader>
            <div className="flex flex-col gap-5 mt-4">
              <Input placeholder="Email" />
              <Input placeholder="Password" type="password" />
              <DialogFooter>
                <Button onClick={() => setLoginOpen(false)}>Login</Button>
              </DialogFooter>
            </div>
          </DialogContent>
        </Dialog>
        <Dialog open={signupOpen} onOpenChange={setSignupOpen}>
          <DialogTrigger asChild>
            <Button>Signup</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Signup</DialogTitle>
              <DialogDescription>Login with your credentials</DialogDescription>
            </DialogHeader>
            <div className="flex flex-col gap-5 mt-4">
              <Input placeholder="First Name" />
              <Input placeholder="Last Name" />
              <Input placeholder="Email" />
              <Input placeholder="Password" type="password" />
              <DialogFooter>
                <Button type="submit" onClick={() => setSignupOpen(false)}>
                  Signup
                </Button>
              </DialogFooter>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </nav>
  );
};

export default Navbar;
