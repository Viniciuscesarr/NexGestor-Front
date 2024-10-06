import Link from "next/link";
import { useRouter } from "next/navigation";

interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
}

interface TableProps {
  dados: Product[];
}

export default function Table({ dados }: TableProps) {
  const router = useRouter();

  async function handleDelete(id: number) {
    const token = localStorage.getItem("authToken");
    const res = await fetch(`http://localhost:8000/api/product/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.ok) {
      alert("Produto deletado com sucesso!");
      window.location.reload();
    } else {
      alert("Erro ao deletar produto.");
    }
  }
  return (
    <>
      <div className="flex flex-col bg-gray-100">
        <main className="flex-grow p-4">
          <section className="w-full max-w-4xl mx-auto p-8 bg-white shadow-md rounded-lg">
            <div className="flex justify-between">
              <h1 className="text-3xl font-medium mb-6 text-gray-800">
                Lista de Produtos
              </h1>
              <Link href="/produtos/cadastro">
                <button className="bg-blue-600 h-7 text-white px-4 rounded">
                  Cadastrar Produto
                </button>
              </Link>
            </div>

            <table className="min-w-full border-collapse border border-gray-300">
              <thead>
                <tr>
                  <th className="border border-gray-300 px-4 py-2">Nome</th>
                  <th className="border border-gray-300 px-4 py-2">
                    Descrição
                  </th>
                  <th className="border border-gray-300 px-4 py-2">Preço</th>
                  <th className="border border-gray-300 px-4 py-2">Ações</th>
                </tr>
              </thead>
              <tbody>
                {dados.map((dado) => (
                  <tr key={dado.id}>
                    <td className="border border-gray-300 px-4 py-2">
                      {dado.name}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {dado.description}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {dado.price}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      <button
                        className="mr-3"
                        onClick={() => handleDelete(dado.id)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          height="24px"
                          viewBox="0 -960 960 960"
                          width="24px"
                          fill="#EA3323"
                        >
                          <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => router.push(`/produtos/edit/${dado.id}`)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          height="26px"
                          viewBox="0 -960 960 960"
                          width="26px"
                          fill="#0000F5"
                        >
                          <path d="M180-180h44l472-471-44-44-472 471v44Zm-60 60v-128l575-574q8-8 19-12.5t23-4.5q11 0 22 4.5t20 12.5l44 44q9 9 13 20t4 22q0 11-4.5 22.5T823-694L248-120H120Zm659-617-41-41 41 41Zm-105 64-22-22 44 44-22-22Z" />
                        </svg>
                      </button>
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
