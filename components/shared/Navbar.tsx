import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center h-20 px-5">
      <Link href={"/"}>
        <h1 className="text-white font-bold letter tracking-widest text-3xl">
          Flight
        </h1>
      </Link>
      <Link href={"/about"}>
        <h1 className="text-white letter text-2xl">About</h1>
      </Link>
    </nav>
  );
};

export default Navbar;
