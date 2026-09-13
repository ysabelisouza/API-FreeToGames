import React from "react";
import { FiSearch } from "react-icons/fi";

export default function BarraDeBusca({ busca, setBusca }) {
  return (
    <div className="busca">
      <FiSearch className="busca-icone" />

      <input
        type="text"
        value={busca}
        onChange={(evento) => setBusca(evento.target.value)}
        name="pesquisarJogos"
        id="pesquisarJogos"
        placeholder="Buscar jogos..."
      />
    </div>
  );
}
