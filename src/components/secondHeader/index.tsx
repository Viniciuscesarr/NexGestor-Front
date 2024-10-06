import Link from "next/link";

export default function SecondHeader() {
  return (
    <header className="bg-[#4c4c4c] w-full h-20 flex items-center justify-center ">
      <Link href="/dashboard">
        <h1 className="ml-10 text-3xl text-white font-medium hover:tracking-widest duration-300">
          NEX<span className="text-[#2079FF] drop-shadow-sm ">GESTOR</span>
        </h1>
      </Link>
    </header>
  );
}
