"use client";
import { useEffect, useState } from "react";

interface EditClientProps {
  params: {
    id: string; 
  };
}

export default function EditClient({ params }: EditClientProps) {
  const { id } = params;
  const [name, setName] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    const fetchClient = async () => {
      const token = localStorage.getItem("authToken");
      const res = await fetch(`http://localhost:8000/api/client/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        const data = await res.json();
        setName(data.name);
        setAddress(data.address);
        setPhone(data.phone);
      } else {
        setMessage("Erro ao carregar os dados do cliente.");
      }
    };

    if (id) {
      fetchClient();
    }
  }, [id]);

  async function handleClient(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const token = localStorage.getItem("authToken");

    const res = await fetch(`http://localhost:8000/api/client/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({
        name,
        address,
        phone,
      }),
    });

    const data = await res.json();

    if (res.ok) {
      setMessage(data.message);
      window.location.href = "/clientes";
    } else {
      setMessage(data.message || "Erro ao atualizar o cliente.");
    }
  }

  return (
    <div>
      <h1 className="text-center mt-10 text-4xl">Edição de Cliente</h1>
      <form className="flex flex-col max-w-4xl mx-auto mt-10" onSubmit={handleClient}>
        <div className="flex flex-col">
          <label>Nome:</label>
          <input
            type="text"
            value={name}
            className="border border-black rounded h-10 mb-5"
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="flex justify-between mb-5">
          <div className="flex flex-col flex-1 mr-2">
            <label>Endereço:</label>
            <input
              type="text"
              value={address}
              className="border border-black rounded h-10 mb-5"
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col flex-1">
            <label>Telefone:</label>
            <input
              type="text"
              value={phone}
              className="border border-black rounded h-10 mb-5"
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>
        </div>
        <button type="submit" className="bg-blue-600 text-white h-10 rounded">
          Atualizar
        </button>
        {message && (
          <p className="w-full flex items-center justify-center p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg shadow-md mt-5">
            {message}
          </p>
        )}
      </form>
    </div>
  );
}
