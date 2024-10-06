"use client";
import SecondHeader from "@/components/secondHeader";
import Sidebar from "@/components/sidebar";
import Table from "@/components/table";
import Loading from "@/components/loading"
import { useEffect, useState } from "react";

export default function Clientes() {
  const [dados, setDados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchClients = async () => {
      const token = localStorage.getItem("authToken");
      try {
        const res = await fetch("http://localhost:8000/api/client", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
        });
        
        if (!res.ok) {
          throw new Error("Erro ao buscar clientes");
        }

        const data = await res.json();
        setDados(data); 
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Erro desconhecido");
        }
      } finally {
        setLoading(false); 
      }
    };

    fetchClients();
  }, []); 

  if (loading) return <Loading />; 
  if (error) return <p>Erro: {error}</p>; 

  return (
    <>
      <SecondHeader />
      <Sidebar>
        <div className="flex-1 p-10 bg-gray-100">
          <h1 className="text-center text-3xl font-medium mb-10">Clientes</h1>
          <Table dados={dados} /> 
        </div>
      </Sidebar>
    </>
  );
}
