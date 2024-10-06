"use client";
import Sidebar from "@/components/sidebar";
import SecondHeader from "@/components/secondHeader";
import { useState, useEffect } from "react";
import Link from "next/link"

interface ProductPivot {
  debt_id: number;
  product_id: number;
  quantity: number;
  price: number;
  created_at: string;
  updated_at: string;
}

interface Product {
  id: number;
  user_id: number;
  name: string;
  description: string;
  price: string;
  created_at: string;
  updated_at: string;
  pivot: ProductPivot;
}

interface Order {
  id: number;
  user_id: number;
  client_id: number;
  total: number;
  created_at: string;
  updated_at: string;
  products: Product[];
}

interface Client {
  id: number;
  name: string;
}

interface PaginatedResponse {
  current_page: number;
  data: Order[];
  last_page: number;
  per_page: number;
  total: number;
}

export default function Notinhas() {
  const [debts, setDebts] = useState<Order[]>([]);
  const [clients, setClients] = useState<Record<number, string>>({});
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);

  const fetchDebts = async (page: number) => {
    const token = localStorage.getItem("authToken");
    const res = await fetch(`http://localhost:8000/api/debts?page=${page}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      console.error("Erro ao buscar as dívidas:", res.statusText);
      return;
    }

    const data: PaginatedResponse = await res.json();
    setDebts(data.data);
    setLastPage(data.last_page);
    fetchClientNames(data.data.map((debt: Order) => debt.client_id)); 
  };

  const fetchClientNames = async (clientIds: number[]) => {
    const token = localStorage.getItem("authToken");
    const names: Record<number, string> = {};

    await Promise.all(
      clientIds.map(async (clientId) => {
        const response = await fetch(`http://localhost:8000/api/client/${clientId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data: Client = await response.json();
          names[clientId] = data.name; 
        }
      })
    );

    setClients((prev) => ({ ...prev, ...names }));
  };

  useEffect(() => {
    fetchDebts(currentPage);
  }, [currentPage]);

  return (
    <>
      <SecondHeader />
      <Sidebar>
        <div className="flex-1 p-10 bg-gray-100">
          <h1 className="text-center text-3xl font-medium mb-10">Notinhas</h1>
          <Link href="/notinhas/cadastro"><button className="bg-blue-500 text-white p-1 rounded mb-3 hover:bg-blue-600">Cadastrar nova nota</button></Link>
          <section className="bg-white w-full h-3/4 rounded flex flex-col p-3">
            {debts.map((debt) => (
              <div key={debt.id} className="w-full h-52 bg-gray-200  rounded p-3 text-xl mb-2">
                <p><span className="font-bold">Cliente:</span> {clients[debt.client_id] || "Carregando..."}</p> 
                <p className="font-bold">Produtos que deve:</p>
                {debt.products.map((product) => (
                  <p key={product.id}>{product.name} - Quantidade: {product.pivot.quantity}</p>
                ))}
                <p><span className="font-bold">Valor total:</span> {debt.total}</p>
              </div>
            ))}
          </section>

          <div className="flex justify-center mt-4">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              className="px-4 py-2 bg-blue-500 text-white rounded mr-2 hover:bg-blue-600 cursor-pointer"
            >
              Anterior
            </button>
            <button
              disabled={currentPage === lastPage}
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, lastPage))}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Próximo
            </button>
          </div>
        </div>
      </Sidebar>
    </>
  );
}
