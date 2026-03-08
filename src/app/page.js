"use client";

import { useEffect, useState } from "react";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Request from "@/components/Request";
import { listarPedidos } from "@/services/Web3Service";

export default function Home() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadRequests() {
    try {
      setLoading(true);
      setError("");

      const result = await listarPedidos();
      setRequests(Array.isArray(result) ? [...result].reverse() : []);
    } catch (err) {
      console.error(err);
      setError(err.message || "Erro ao carregar pedidos.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadRequests();
  }, []);

  return (
    <>
      <Header />

      <div className="container py-4">
        <p className="lead mb-4">
          Ajude as vítimas de enchentes e demais desastres naturais do Brasil.
        </p>

        <div className="alert alert-light border">
          Conecte sua carteira para registrar um pedido de ajuda na blockchain Sepolia.
        </div>

        <div className="d-flex justify-content-between align-items-center mb-3 mt-4">
          <h2 className="h4 m-0">Pedidos registrados</h2>
          <button
            type="button"
            className="btn btn-outline-dark btn-sm"
            onClick={loadRequests}
            disabled={loading}
          >
            {loading ? "Atualizando..." : "Atualizar"}
          </button>
        </div>

        {loading && (
          <div className="alert alert-secondary">
            Carregando pedidos...
          </div>
        )}

        {!loading && error && (
          <div className="alert alert-danger">{error}</div>
        )}

        {!loading && !error && requests.length === 0 && (
          <div className="alert alert-warning">
            Nenhum pedido foi registrado ainda.
          </div>
        )}

        {!loading && !error && requests.length > 0 && (
          <div className="list-group shadow-sm">
            {requests.map((item, index) => (
              <Request key={String(item?.id ?? index)} data={item} />
            ))}
          </div>
        )}

        <Footer />
      </div>
    </>
  );
}