import Link from "next/link"

interface Employee {
    id: number;
    name: string;
    address: string;
    phone: string;
    salary: string,
    email: string
  }

  interface TableProps {
    dados: Employee[];
  }

export default function Table({dados}: TableProps) {
  return (
    <>
      <div className="flex flex-col bg-gray-100">
        <main className="flex-grow p-4">
          <section className="w-full max-w-4xl mx-auto p-8 bg-white shadow-md rounded-lg">
            <div className="flex justify-between">
              <h1 className="text-3xl font-medium mb-6 text-gray-800">
                Lista de Funcionários
              </h1>
              <Link href="/funcionarios/cadastro">
                <button className="bg-blue-500 h-7 text-white px-4 rounded hover:bg-blue-600">
                  Cadastrar funcionário
                </button>
              </Link>
            </div>

            <table className="min-w-full border-collapse border border-gray-300">
              <thead>
                <tr>
                  <th className="border border-gray-300 px-4 py-2">Nome</th>
                  <th className="border border-gray-300 px-4 py-2">Endereço</th>
                  <th className="border border-gray-300 px-4 py-2">Telefone</th>
                  <th className="border border-gray-300 px-4 py-2">Salário</th>
                  <th className="border border-gray-300 px-4 py-2">Email</th>
                </tr>
              </thead>
              <tbody>
                {dados.map((dado) => (
                  <tr key={dado.id}>
                    <td className="border border-gray-300 px-4 py-2">
                      {dado.name}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {dado.address}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {dado.phone}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {dado.salary}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {dado.email}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        </main>
      </div>
    </>
  );
}
