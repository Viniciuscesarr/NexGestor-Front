import Link from "next/link";

export default function Header() {
    return(
        <header className="bg-[#4c4c4c] w-full h-20 flex items-center justify-between ">
            <Link href="/"><h1 className="ml-10 text-3xl text-white font-medium hover:tracking-widest duration-300">NEX<span className="text-[#2079FF] drop-shadow-sm ">GESTOR</span></h1></Link>
            <div className="text-white flex space-x-3 mr-5 ">
                <Link href="login"><button className="hover:text-[#2079ff]">LOGIN</button></Link>
                <Link href="sobrenos"><button className="hover:text-[#2079ff] hidden sm:block">SOBRE-NOS</button></Link>
                <Link href="contato"><button className="hover:text-[#2079ff]">CONTATO</button></Link>
            </div>
        </header>
    )
}