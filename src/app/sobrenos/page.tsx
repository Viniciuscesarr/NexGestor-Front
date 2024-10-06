import Header from "@/components/header";

export default function SobreNos() {
    return(
        <>
            <Header />
            <main className="flex flex-col items-center">
                <h1 className="flex justify-center text-4xl font-medium mt-5 mb-5">SOBRE-NÓS</h1>
                <h2>Isso ainda tá em melhora</h2>
                <div className="bg-[#d9d9d9] px-5 rounded sm:w-2/6"><p>Nós somos uma empresa de gestão focada em trazer melhor conforto e gerenciamento para a sua empresa, com o NEXGESTOR você pode cadastrar seus clientes fazer o fluxo de caixa da sua empresa, gerenciar suas contas, com ele você pode automatizar tudo e facilitar o seu trabalho, mande mensagem para nós logo abaixo em contato!</p></div>
            </main>
        </>
    )
}