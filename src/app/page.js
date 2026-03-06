"use client";

import Footer from "@/components/Footer";
import Header from "@/components/Header";

export default function Home() {
  return (
    <>
      <Header />

      <div className="container">
        <div className="row ps-5">
          <p className="lead m-4">
            Ajude as vítimas de enchentes e demais desastres naturais do Brasil.
          </p>
        </div>

        <div className="p-4 mx-5">
          <div className="alert alert-light border">
            Conecte sua carteira para ajudar ou registrar um pedido.
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
}