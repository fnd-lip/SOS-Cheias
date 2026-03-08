"use client";

import { useState } from "react";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { registrarPedido } from "@/services/Web3Service";

export default function CreatePage() {
  const [request, setRequest] = useState({
    title: "",
    description: "",
    contact: ""
  });

  const [txHash, setTxHash] = useState("");
  const [sending, setSending] = useState(false);

  function onInputChange(evt) {
    setRequest((prevState) => ({
      ...prevState,
      [evt.target.id]: evt.target.value
    }));
  }

  async function btnSaveClick() {
    if (!request.title || !request.description || !request.contact) {
      alert("Preencha título, descrição e contato.");
      return;
    }

    try {
      setSending(true);
      setTxHash("");

      const result = await registrarPedido(request);

      if (result?.transactionHash) {
        setTxHash(result.transactionHash);
      }

      alert("Pedido registrado com sucesso na blockchain.");

      setRequest({
        title: "",
        description: "",
        contact: ""
      });
    } catch (err) {
      console.error(err);
      alert(err.message || "Erro ao registrar pedido.");
    } finally {
      setSending(false);
    }
  }

  return (
    <>
      <Header />

      <div className="container py-4">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="card shadow-sm border-0">
              <div className="card-body p-4">
                <h2 className="mb-3">Registrar pedido</h2>
                <p className="text-muted mb-4">
                  Preencha os campos abaixo para registrar um pedido de ajuda no contrato inteligente.
                </p>

                <div className="form-floating mb-3">
                  <input
                    type="text"
                    id="title"
                    className="form-control"
                    maxLength={150}
                    value={request.title}
                    onChange={onInputChange}
                    placeholder="Título"
                  />
                  <label htmlFor="title">Título do pedido</label>
                </div>

                <div className="form-floating mb-3">
                  <textarea
                    id="description"
                    className="form-control"
                    style={{ height: "120px" }}
                    value={request.description}
                    onChange={onInputChange}
                    placeholder="Descrição"
                  ></textarea>
                  <label htmlFor="description">Descrição</label>
                </div>

                <div className="form-floating mb-4">
                  <input
                    type="text"
                    id="contact"
                    className="form-control"
                    maxLength={150}
                    value={request.contact}
                    onChange={onInputChange}
                    placeholder="Contato"
                  />
                  <label htmlFor="contact">Contato</label>
                </div>

                <div className="d-flex gap-2">
                  <a href="/" className="btn btn-outline-secondary">
                    Voltar
                  </a>

                  <button
                    type="button"
                    className="btn btn-dark"
                    onClick={btnSaveClick}
                    disabled={sending}
                  >
                    {sending ? "Enviando..." : "Registrar na blockchain"}
                  </button>
                </div>

                {txHash && (
                  <div className="alert alert-success mt-4 mb-0">
                    <strong>Hash da transação:</strong>
                    <br />
                    <span style={{ wordBreak: "break-all" }}>{txHash}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
}