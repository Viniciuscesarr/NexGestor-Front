"use client";
import SecondHeader from "@/components/secondHeader";
import Sidebar from "@/components/sidebar";
import Table from "./table";
import { useState, useEffect } from "react";

export default function Produtos() {
  const token = localStorage.getItem("authToken");
  const [dados, setDados] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("http://localhost:8000/api/product", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });

      const data = await res.json();
      setDados(data);
    };

    fetchData();
  }, [token]);

  return (
    <>
      <SecondHeader />
      <Sidebar>
      <div className="flex-1 p-10 bg-gray-100">
          <h1 className="text-center text-3xl font-medium mb-10">Produtos</h1>
          <Table dados={dados} />
        </div>
      </Sidebar>
    </>
  );
}
