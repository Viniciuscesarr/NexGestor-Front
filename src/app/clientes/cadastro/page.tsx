"use client";
import SecondHeader from "@/components/secondHeader";
import { useState } from "react";

export default function Cadastro() {
  const [name, setName] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  async function handleClient(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const token = localStorage.getItem("authToken");

    const res = await fetch("http://localhost:8000/api/client", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        name: name,
        address: address,
        phone: phone,
      }),
    });

    const data = await res.json();

    if (res.ok) {
      setMessage(data.message);
      window.location.href = "/clientes";
    } else {
      setMessage(data.message || "Erro ao cadastrar o cliente.");
    }
  }

  return (
    <>
      <SecondHeader />
      <div className="">
        <h1 className="text-center mt-10 text-4xl">Cadastro de Cliente</h1>
        <form
          className="flex flex-col max-w-4xl mx-auto mt-10"
          onSubmit={handleClient}
        >
          <div className="flex flex-col">
            <label>Nome:</label>
            <input
              type="text"
              className="border border-black rounded h-10 mb-5"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="flex justify-between mb-5">
            <div className="flex flex-col flex-1 mr-2">
              <label>Endereço:</label>
              <input
                type="text"
                className="border border-black rounded h-10 mb-5"
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div className="flex flex-col flex-1">
              <label>Telefone:</label>
              <input
                type="text"
                className="border border-black rounded h-10 mb-5"
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
          </div>
          <button type="submit" className="bg-blue-600 text-white h-10 rounded">
            Cadastrar
          </button>
          {message && (
            <p className=" w-full flex items-center justify-center p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg shadow-md mt-5">
              {message}
            </p>
          )}
        </form>
      </div>
    </>
  );
}
