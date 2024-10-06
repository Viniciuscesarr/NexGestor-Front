"use client";
import SecondHeader from "@/components/secondHeader";
import Sidebar from "@/components/sidebar";
import Table from "./table";
import { useState, useEffect } from "react";
import Loading from "@/components/loading";

export default function Funcionario() {
  const [dados, setDados] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const FetchEmployees = async () => {
      const token = localStorage.getItem("authToken");
      try{
        const res = await fetch("http://localhost:8000/api/employee", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`   
            }
        });

        if(!res) {
            throw new Error("Erro ao buscar funcionários")
        }
        const data = await res.json()
        setDados(data)
      } catch(err) {
        console.log(err)
      }finally{
        setLoading(false)
      }
    };

    FetchEmployees()
  }, []);

  if (loading) return <Loading />; 
  return (
    <>
      <SecondHeader />
      <Sidebar>
        <div className="flex-1 p-10 bg-gray-100">
          <h1 className="text-center text-3xl font-medium mb-10">Funcionários</h1>
          <Table dados={dados} />
        </div>
      </Sidebar>
    </>
  );
}
