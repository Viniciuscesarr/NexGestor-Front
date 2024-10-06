import Secondheader from "@/components/secondHeader";
import Sidebar from "@/components/sidebar";
import SecondHeader from "@/components/secondHeader";
import Link from "next/link";

export default function Dashboard() {
  return (
    <div className="dashboard">
      <SecondHeader />
      <Sidebar>
        <div className="flex-1 p-10 bg-gray-100">
          <h1 className="text-center text-4xl font-semibold mb-8">Dashboard</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <Link href="/caixa">
              <div className="bg-blue-500 shadow-lg rounded-lg p-6 flex flex-col items-center cursor-pointer">
                <h2 className="text-xl font-medium text-white">Transações</h2>
                <p className="text-white">Gerenciar suas transações</p>
              </div>
            </Link>

            <div
              className="bg-green-500 shadow-lg rounded-lg p-6 flex flex-col items-center cursor-pointer"
              
            >
              <h2 className="text-xl font-medium text-white">Relatórios</h2>
              <p className="text-white">Visualizar relatórios financeiros</p>
            </div>

            <div
              className="bg-yellow-500 shadow-lg rounded-lg p-6 flex flex-col items-center cursor-pointer"
             
            >
              <h2 className="text-xl font-medium text-white">Configurações</h2>
              <p className="text-white">Configurar sua conta</p>
            </div>

            <div
              className="bg-red-500 shadow-lg rounded-lg p-6 flex flex-col items-center cursor-pointer"
             
            >
              <h2 className="text-xl font-medium text-white">Ajuda</h2>
              <p className="text-white">Obter suporte</p>
            </div>
          </div>
        </div>
      </Sidebar>
    </div>
  );
}
