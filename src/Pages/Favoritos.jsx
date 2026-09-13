import React from "react";
import { useOutletContext } from "react-router-dom";
import { FiHeart } from "react-icons/fi";
import CardGames from "../Components/CardGames";

export default function Favoritos() {
  const { favoritos } = useOutletContext();

  return (
    <section className="favoritos">
      <div className="pagina-cabecalho">
        <div className="pagina-icone">
          <FiHeart />
        </div>

        <div>
          <span className="pequeno-titulo">SUA COLEÇÃO</span>
          <h1 className="titulo-secao">Meus favoritos</h1>
          <p className="subtitulo-secao">
            Seus jogos salvos em um só lugar.
          </p>
        </div>
      </div>

      {favoritos.length === 0 ? (
        <div className="mensagem-vazia">
          <FiHeart />
          <h2>Nenhum favorito ainda</h2>
          <p>
            Adicione jogos aos favoritos para encontrá-los aqui.
          </p>
        </div>
      ) : (
        <div className="grade-jogos">
          {favoritos.map((jogo) => (
            <CardGames
              key={jogo.id}
              jogo={jogo}
            />
          ))}
        </div>
      )}
    </section>
  );
}
