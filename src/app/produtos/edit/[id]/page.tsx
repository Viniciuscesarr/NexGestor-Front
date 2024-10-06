"use client";
import { useEffect, useState } from "react";

interface EditProductsProps {
  params: {
    id: string;
  };
}

export default function EditProducts({ params }: EditProductsProps) {
  const { id } = params;
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [price, setPrice] = useState<string>("");

  useEffect(() => {
    const fetchProduct = async () => {
      const token = localStorage.getItem("authToken");
      const res = await fetch(`http://localhost:8000/api/product/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.ok) {
        const data = await res.json();
        setName(data.name);
        setDescription(data.description);
        setPrice(data.price);
      }
    };
    if (id) {
      fetchProduct();
    }
  }, [id]);

  async function handleEdit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const token = localStorage.getItem("authToken");

    const res = await fetch(`http://localhost:8000/api/product/${id}`, {
      method: "PUT",
      headers: {
        "Content-type": "Application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name, description, price }),
    });
    const data = await res.json();

    if (res.ok) {
      window.location.href = "/produtos";
    }
  }
  return (
    <div>
      <h1 className="text-center mt-10 text-4xl">Editar um Produto</h1>
      <form
        className="flex flex-col max-w-4xl mx-auto mt-10"
        onSubmit={handleEdit}
      >
        <div className="flex flex-col">
          <label>Nome:</label>
          <input
            type="text"
            className="border border-black rounded h-10 mb-5"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="flex justify-between mb-5">
          <div className="flex flex-col flex-1 mr-2">
            <label>Descrição:</label>
            <input
              type="text"
              className="border border-black rounded h-10 mb-5"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="flex flex-col flex-1">
            <label>Preço:</label>
            <input
              type="text"
              className="border border-black rounded h-10 mb-5"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
        </div>
        <button type="submit" className="bg-blue-600 text-white h-10 rounded">
          Editar
        </button>
      </form>
    </div>
  );
}
