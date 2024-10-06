import Header from "@/components/header"

export default function Contato() {
    return(
        <>
            <Header />
            <main className="w-full max-w-7xl mx-auto flex flex-col items-center">
                <h1 className="mt-10 text-4xl font-medium text-center">CONTATO</h1> 
                <form className="mt-6 w-full max-w-lg mx-auto">
                    <div className="flex flex-col w-full">
                        <label className="mb-2 w-full text-left">SEU NOME:</label>
                        <input type="text" className="w-full border border-black rounded h-10 mx-auto"/>
                    </div>
                    <div className="flex flex-col w-full mt-5">
                        <label className="mb-2 w-full text-left">SEU EMAIL:</label>
                        <input type="text" className="w-full border border-black rounded h-10 mx-auto"/>
                    </div>
                    <div className="flex flex-col w-full mt-5">
                        <label className="mb-2 w-full text-left">DESCRIÇÃO:</label>
                        <textarea className="w-full border border-black rounded h-20 mx-auto"></textarea>
                    </div>
                    <div className="flex flex-col w-full">
                        <button className="w-full bg-[#2079ff] text-white mt-5 h-10 rounded">Enviar</button>
                    </div>
                </form>
            </main>
        </>
    )
}