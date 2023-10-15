import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center h-20 px-5">
      <Link href={"/"} className="flex items-center gap-2 ">
        <Image src={"/logo.png"} alt="logo" width={30} height={30} />
        <h1 className="text-white font-bold letter tracking-widest text-3xl">
          SIDG GO
        </h1>
      </Link>
      <Link href={"/about"}>
        <h1 className="text-white letter text-2xl">About</h1>
      </Link>
    </nav>
  );
};

export default Navbar;
