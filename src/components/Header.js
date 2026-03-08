"use client";

import { useEffect, useState } from "react";
import { doLogin } from "@/services/Web3Service";

export default function Header() {
  const [wallet, setWallet] = useState("");

  useEffect(() => {
    setWallet(localStorage.getItem("wallet") || "");
  }, []);

  function btnLoginClick() {
    doLogin()
      .then((connectedWallet) => setWallet(connectedWallet))
      .catch((err) => {
        console.error(err);
        alert(err.message);
      });
  }

  function btnLogoutClick() {
    localStorage.removeItem("wallet");
    setWallet("");
    window.location.reload();
  }

  return (
    <header className="p-3 text-bg-dark">
      <div className="container">
        <div className="d-flex flex-wrap align-items-center justify-content-between">
          <a href="/" className="text-decoration-none">
            <h1 className="fw-bold text-light m-0">SOS-Cheias</h1>
          </a>

          <ul className="nav me-auto ms-4">
            <li className="nav-item">
              <a href="/" className="nav-link text-light">Início</a>
            </li>
            <li className="nav-item">
              <a href="/create" className="nav-link text-light">Registrar pedido</a>
            </li>
          </ul>

          <div className="d-flex align-items-center gap-2">
            {wallet ? (
              <>
                <span className="text-light small">
                  {wallet.slice(0, 6)}...{wallet.slice(-4)}
                </span>
                <button
                  type="button"
                  className="btn btn-outline-light btn-sm"
                  onClick={btnLogoutClick}
                >
                  Sair
                </button>
              </>
            ) : (
              <button
                type="button"
                className="btn btn-outline-light"
                onClick={btnLoginClick}
              >
                <img src="/metamask.svg" width="24" className="me-2" alt="MetaMask" />
                Entrar com MetaMask
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}