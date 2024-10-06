"use client";
import { useState } from "react";
import Header from "@/components/header";

interface LoginResponse {
  token?: string;
  message?: string;
}

export default function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("http://localhost:8000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*"
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      
      const data: LoginResponse = await res.json();

      if (res.ok) {
        if (data.token) {
          localStorage.setItem("authToken", data.token);
          console.log(data.token)
          console.log("token armazenado com sucesso");
        }

        window.location.href = "/dashboard";
      } else {
        setError(data.message || "Ocorreu um erro ao tentar realizar o Login");
      }
    } catch (err) {
      console.error("Erro ao fazer login:", err);
      setError("Ocorreu um erro ao fazer login. Tente novamente.");
    }
  };

  return (
    <>
      <div className="flex flex-col min-h-screen bg-gray-100">
        <Header />
        <main className="flex-grow flex items-center justify-center p-4">
          <section className="w-full max-w-sm p-8 bg-white shadow-md rounded-lg">
            <h1 className="text-3xl font-medium mb-6 text-gray-800">
              Faça Login
            </h1>
            <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="email" className="block text-gray-700">
                  Email:
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="Digite seu email"
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-gray-700">
                  Senha:
                </label>
                <input
                  id="password"
                  type="password"
                  placeholder="Digite sua senha"
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Entrar
              </button>
            </form>
          </section>
        </main>
      </div>
    </>
  );
}
