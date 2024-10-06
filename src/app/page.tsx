import Image from "next/image";
import Header from "@/components/header";
import tablet from "../../public/Online resume-cuate.png"

export default function Home() {
  return (
    <>
    <Header />
    <main className="flex justify-center flex-col items-center">
      <h1 className="text-center text-3xl text-blue-600 font-medium flex justify-center mt-10">SEU MAIOR SITE<br />DE 
      <br />GESTÃO DE EMPRESAS</h1>
      <Image src={tablet} alt="foto tablet" height={360} width={360} className="flex"/>
    </main>
    </>
  );
}
