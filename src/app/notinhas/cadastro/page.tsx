"use client";
import { useState, useEffect } from "react";

interface Client {
  id: number;
  name: string;
}

interface Product {
  id: number;
  name: string;
}

interface SelectedProduct {
  product_id: number;
  quantity: number;
  price: number;
}

export default function Cadastro() {
  const [clients, setClients] = useState<Client[]>([]);
  const [products, setProducts] = useState<Product[]>([]); 
  const [selectedClient, setSelectedClient] = useState<number | undefined>(undefined);
  const [selectedProducts, setSelectedProducts] = useState<SelectedProduct[]>([]);

  useEffect(() => {
    const fetchClients = async () => {
      const token = localStorage.getItem("authToken");
      const res = await fetch("http://localhost:8000/api/client", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      setClients(data);
    };
    fetchClients();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      const token = localStorage.getItem("authToken");
      const res = await fetch("http://localhost:8000/api/product", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      setProducts(data);
    };
    fetchProducts();
  }, []);

  const handleClientChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedClient(Number(e.target.value));
  };

  // Manipula a mudança nos produtos selecionados
  const handleProductChange = (index: number, field: keyof SelectedProduct, value: number) => {
    const updatedProducts = [...selectedProducts];
    updatedProducts[index] = {
      ...updatedProducts[index],
      [field]: value,
    };
    setSelectedProducts(updatedProducts);
  };

  const addProduct = () => {
    setSelectedProducts([...selectedProducts, { product_id: 0, quantity: 0, price: 0 }]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = {
      client_id: selectedClient,
      products: selectedProducts,
    };

    console.log("Form data enviada para o backend:", formData);

    const token = localStorage.getItem("authToken");
    await fetch("http://localhost:8000/api/debts", { 
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    });
  };

  return (
    <div>
      <h1 className="text-center mt-10 text-4xl">Cadastro de Notinhas</h1>
      <form className="flex flex-col max-w-4xl mx-auto mt-10" onSubmit={handleSubmit}>
        <div className="flex flex-col mb-5">
          <label>Cliente:</label>
          <select
            className="h-12 border border-black rounded mb-3"
            value={selectedClient}
            onChange={handleClientChange}
          >
            <option value="">Selecione um cliente</option>
            {clients.map((client) => (
              <option key={client.id} value={client.id}>
                {client.name}
              </option>
            ))}
          </select>
        </div>

        {selectedProducts.map((product, index) => (
          <div key={index} className="mb-5">
            <label>Produto:</label>
            <select
              className="h-12 border border-black rounded mb-3"
              value={product.product_id}
              onChange={(e) =>
                handleProductChange(index, "product_id", Number(e.target.value))
              }
            >
              <option value="">Selecione um produto</option>
              {products.map((product) => (
                <option key={product.id} value={product.id}>
                  {product.name}
                </option>
              ))}
            </select>

            <label>Quantidade:</label>
            <input
              type="number"
              className="border border-black rounded h-10 mb-5"
              value={product.quantity}
              onChange={(e) =>
                handleProductChange(index, "quantity", Number(e.target.value))
              }
            />

            <label>Preço:</label>
            <input
              type="number"
              step="0.01"
              className="border border-black rounded h-10 mb-5"
              value={product.price}
              onChange={(e) =>
                handleProductChange(index, "price", Number(e.target.value))
              }
            />
          </div>
        ))}

        <button type="button" onClick={addProduct} className="bg-gray-500 text-white h-10 rounded mb-5">
          Adicionar Produto
        </button>

        <button type="submit" className="bg-blue-600 text-white h-10 rounded">
          Cadastrar
        </button>
      </form>
    </div>
  );
}
