"use client";
import SecondHeader from "@/components/secondHeader";
import { useState } from "react";

export default function Cadastro() {
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [price, setPrice] = useState<string>("");

  async function handleRegister(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const token = localStorage.getItem("authToken");
    const res = await fetch("http://localhost:8000/api/product", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: name,
        description: description,
        price: price,
      }),
    });
    if (res.ok) {
      window.location.href = "/produtos";
    }
  }
  return (
    <>
      <SecondHeader />
      <div>
        <h1 className="text-center mt-10 text-4xl">Cadastro de Produto</h1>
        <form
          className="flex flex-col max-w-4xl mx-auto mt-10"
          onSubmit={handleRegister}
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
              <label>Descrição:</label>
              <input
                type="text"
                className="border border-black rounded h-10 mb-5"
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="flex flex-col flex-1">
              <label>Preço:</label>
              <input
                type="text"
                className="border border-black rounded h-10 mb-5"
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
          </div>
          <button type="submit" className="bg-blue-600 text-white h-10 rounded">
            Cadastrar
          </button>
        </form>
      </div>
    </>
  );
}
