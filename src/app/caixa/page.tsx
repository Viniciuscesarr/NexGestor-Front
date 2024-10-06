"use client";
import SecondHeader from "@/components/secondHeader";
import Sidebar from "@/components/sidebar";
import { useState, useEffect } from "react";

interface Transaction {
  id: number;
  amount: number;
  type: string;
  created_at: string;
}

interface TransactionResponse {
  current_page: number;
  data: Transaction[];
  last_page: number;
  next_page_url: string | null;
  prev_page_url: string | null;
}

export default function Transactions() {
  const [balanceValue, setBalance] = useState<number | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);
  const [amount, setAmount] = useState<number | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [lastPage, setLastPage] = useState<number>(1);

  const fetchBalance = async () => {
    const token = localStorage.getItem("authToken");
    const res = await fetch(`http://localhost:8000/api/balance`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.ok) {
      const data = await res.json();
      setBalance(data.total_balance);
    }
  };

  const fetchTransactions = async (page: number) => {
    const token = localStorage.getItem("authToken");
    const res = await fetch(
      `http://localhost:8000/api/transactions?page=${page}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (res.ok) {
      const data: TransactionResponse = await res.json();
      setTransactions(data.data);
      setCurrentPage(data.current_page);
      setLastPage(data.last_page);
    }
  };

  async function handleAddValue(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const token = localStorage.getItem("authToken");

    if (amount === null || isNaN(amount) || amount <= 0) {
      alert("Por favor, insira um valor válido.");
      return;
    }

    const res = await fetch(`http://localhost:8000/api/transactions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        amount: Number(amount),
        type: "deposit",
      }),
    });

    if (res.ok) {
      const responseData = await res.json();
      alert("Transação realizada com sucesso!");

      setTransactions((prev) => [
        ...prev,
        {
          id: responseData.transaction.id,
          amount: Number(amount),
          type: "deposit",
          created_at: new Date().toISOString(),
        },
      ]);

      setIsAddModalOpen(false);
      fetchBalance();
    } else {
      alert("Erro ao realizar a transação.");
    }
  }

  async function handleWithdrawValue(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const token = localStorage.getItem("authToken");

    if (amount === null || isNaN(amount) || amount <= 0) {
      alert("Por favor, insira um valor válido.");
      return;
    }

    const res = await fetch(`http://localhost:8000/api/transactions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        amount: Number(amount),
        type: "withdrawal",
      }),
    });

    if (res.ok) {
      const responseData = await res.json();
      alert("Transação de retirada realizada com sucesso!");

      setTransactions((prev) => [
        ...prev,
        {
          id: responseData.transaction.id,
          amount: Number(amount),
          type: "withdrawal",
          created_at: new Date().toISOString(),
        },
      ]);

      setIsWithdrawModalOpen(false);
      fetchBalance();
    } else {
      alert("Erro ao realizar a transação.");
    }
  }

  useEffect(() => {
    fetchBalance();
    fetchTransactions(currentPage);
  }, []);

  const openAddModal = () => setIsAddModalOpen(true);
  const closeAddModal = () => setIsAddModalOpen(false);
  const openWithdrawModal = () => setIsWithdrawModalOpen(true);
  const closeWithdrawModal = () => setIsWithdrawModalOpen(false);

  return (
    <div className="transactions">
      <SecondHeader />
      <Sidebar>
        <div className="flex-1 p-3 bg-gray-100">
          <h1 className="text-center text-4xl font-semibold mb-8">
            Fluxo de Caixa
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center">
              <h2 className="text-xl font-medium">Receita Total</h2>
              <p className="text-3xl font-bold mt-4">R${balanceValue}</p>
              <button
                onClick={openAddModal}
                className="mt-4 bg-blue-500 rounded text-white p-2 w-full hover:bg-blue-600"
              >
                Adicionar Saldo
              </button>
            </div>

            <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center">
              <h2 className="text-xl font-medium">Retirar Saldo</h2>
              <p className="text-sm text-gray-500 mb-4">
                Selecione um valor para retirar.
              </p>
              <button
                onClick={openWithdrawModal}
                className="mt-4 bg-red-500 rounded text-white p-2 w-full hover:bg-red-600"
              >
                Retirar Saldo
              </button>
            </div>
          </div>

          <h2 className="text-2xl font-semibold mb-4">Transações Realizadas</h2>
          <div className="bg-white shadow-lg rounded-lg p-6">
            {transactions.length === 0 ? (
              <p className="text-center">Nenhuma transação realizada.</p>
            ) : (
              <ul className="space-y-4">
                {transactions.map((transaction) => (
                  <li
                    key={transaction.id}
                    className="border-b border-gray-300 pb-2"
                  >
                    <div className="flex justify-between">
                      <span>
                        {transaction.type === "deposit"
                          ? "Depósito"
                          : "Retirada"}
                      </span>
                      <span className="font-bold">R${transaction.amount}</span>
                    </div>
                    <span className="text-gray-500 text-sm">
                      {new Date(transaction.created_at).toLocaleDateString()}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Paginação */}
          <div className="flex justify-between mt-4">
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              onClick={() => fetchTransactions(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Anterior
            </button>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              onClick={() => fetchTransactions(currentPage + 1)}
              disabled={currentPage === lastPage}
            >
              Próximo
            </button>
          </div>
        </div>
      </Sidebar>

      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-96">
            <h2 className="text-2xl font-medium mb-4">Adicionar Saldo</h2>
            <form onSubmit={handleAddValue}>
              <label className="block mb-2">Valor:</label>
              <input
                type="number"
                className="border border-gray-400 p-2 rounded w-full mb-4"
                placeholder="Digite o valor"
                min={0}
                onChange={(e) => setAmount(Number(e.target.value))}
              />
              <button
                className="bg-green-500 text-white p-2 rounded w-full hover:bg-green-600"
                type="submit"
              >
                Adicionar
              </button>
            </form>
            <button
              onClick={closeAddModal}
              className="bg-red-500 text-white p-2 rounded mt-4 w-full hover:bg-red-600"
            >
              Fechar
            </button>
          </div>
        </div>
      )}

      {isWithdrawModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-96">
            <h2 className="text-2xl font-medium mb-4">Retirar Saldo</h2>
            <form onSubmit={handleWithdrawValue}>
              <label className="block mb-2">Valor:</label>
              <input
                type="number"
                className="border border-gray-400 p-2 rounded w-full mb-4"
                placeholder="Digite o valor"
                min={0}
                onChange={(e) => setAmount(Number(e.target.value))}
              />
              <button
                className="bg-red-500 text-white p-2 rounded w-full hover:bg-red-600"
                type="submit"
              >
                Retirar
              </button>
            </form>
            <button
              onClick={closeWithdrawModal}
              className="bg-gray-500 text-white p-2 rounded mt-4 w-full hover:bg-gray-600"
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
