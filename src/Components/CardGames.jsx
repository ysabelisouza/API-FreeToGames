import React from "react";
import { Link, useOutletContext } from "react-router-dom";
import { FiHeart } from "react-icons/fi";
import { RiHeartFill } from "react-icons/ri";

export default function CardGames({ jogo }) {
  const { favoritos, setFavoritos } = useOutletContext();

  const jogoFavorito = favoritos.some(
    (favorito) => favorito.id === jogo.id
  );

  function alternarFavorito(evento) {
    evento.preventDefault();

    if (jogoFavorito) {
      setFavoritos(
        favoritos.filter(
          (favorito) => favorito.id !== jogo.id
        )
      );
    } else {
      setFavoritos([...favoritos, jogo]);
    }
  }

  return (
    <article className="cartucho">
      <div className="cartucho-capa">
        <Link to={`/item/${jogo.id}`}>
          <img
            src={jogo.thumbnail}
            alt={jogo.title}
          />
        </Link>

        <button
          className={`cartucho-favorito ${
            jogoFavorito ? "ativo" : ""
          }`}
          onClick={alternarFavorito}
          aria-label={
            jogoFavorito
              ? "Remover dos favoritos"
              : "Adicionar aos favoritos"
          }
        >
          {jogoFavorito ? <RiHeartFill /> : <FiHeart />}
        </button>
      </div>

      <Link to={`/item/${jogo.id}`}>
        <div className="cartucho-info">
          <h2 className="cartucho-titulo">
            {jogo.title}
          </h2>

          <div className="cartucho-tags">
            <span>{jogo.genre}</span>
            <span>{jogo.platform}</span>
          </div>
        </div>
      </Link>
    </article>
  );
}
