"use client";

import { generateAvatarURL } from "@cfx-kit/wallet-avatar";

export default function Request({ data }) {
  if (!data) return null;

  const dataFormatada = data.timestamp
    ? new Date(Number(data.timestamp) * 1000).toLocaleString("pt-BR")
    : "";

  return (
    <div className="list-group-item list-group-item-action d-flex gap-3 py-3">
      <img
        src={generateAvatarURL(data.autor || "0x0000000000000000000000000000000000000000")}
        width="32"
        height="32"
        className="rounded-circle"
        alt="Avatar da carteira"
      />

      <div className="d-flex gap-2 w-100 justify-content-between">
        <div className="w-100">
          <h6 className="mb-1">
            {data.titulo || "Sem título"} &rsaquo;&rsaquo; Contato: {data.contato || "-"}
          </h6>

          <p className="opacity-75 mb-2">{data.descricao || ""}</p>

          <small className="text-body-secondary d-block">
            Autor: {data.autor || "-"}
          </small>

          <small className="text-body-secondary d-block">
            Data: {dataFormatada}
          </small>
        </div>
      </div>
    </div>
  );
}