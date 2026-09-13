import React from "react";
import { useParams, useOutletContext, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { FiArrowLeft, FiHeart } from "react-icons/fi";

export default function Detalhes() {
  const { id } = useParams();
  const [jogo, setJogo] = useState(null);
  const { favoritos, setFavoritos } = useOutletContext();

  useEffect(() => {
    async function buscarJogo() {
      const response = await fetch(
        `https://www.freetogame.com/api/game?id=${id}`
      );

      const dados = await response.json();
      setJogo(dados);
    }

    buscarJogo();
  }, [id]);

  if (!jogo) {
    return (
      <p className="mensagem-estado">
        Carregando jogo...
      </p>
    );
  }

  const jogoFavorito = favoritos.some(
    (favorito) => favorito.id === jogo.id
  );

  function alternarFavorito() {
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
    <section className="detalhes">
      <Link to="/" className="voltar">
        <FiArrowLeft />
        Voltar para jogos
      </Link>

      <div
        className="detalhe-banner"
        style={{
          backgroundImage: `linear-gradient(90deg, rgba(8, 9, 16, 0.98), rgba(8, 9, 16, 0.72), rgba(8, 9, 16, 0.25)), url(${jogo.thumbnail})`,
        }}
      >
        <div className="detalhe-banner-conteudo">
          <span className="hero-label">DETALHES DO JOGO</span>
          <h1>{jogo.title}</h1>

          <div className="detalhe-tags">
            <span>{jogo.genre}</span>
            <span>{jogo.platform}</span>
          </div>
        </div>
      </div>

      <div className="detalhe-grid">
        <div className="detalhe-capa">
          <img
            src={jogo.thumbnail}
            alt={jogo.title}
          />

          <button
            className={`detalhe-favorito-btn ${
              jogoFavorito ? "ativo" : ""
            }`}
            onClick={alternarFavorito}
          >
            <FiHeart />
            {jogoFavorito
              ? "Remover dos favoritos"
              : "Adicionar aos favoritos"}
          </button>
        </div>

        <div className="detalhe-conteudo">
          <h2 className="detalhe-secao-titulo">
            Sobre o jogo
          </h2>

          <p className="detalhe-descricao">
            {jogo.description}
          </p>

          <div className="ficha-tecnica">
            <div className="ficha-item">
              <span>Gênero</span>
              <strong>{jogo.genre}</strong>
            </div>

            <div className="ficha-item">
              <span>Plataforma</span>
              <strong>{jogo.platform}</strong>
            </div>

            <div className="ficha-item">
              <span>Desenvolvedora</span>
              <strong>{jogo.developer}</strong>
            </div>

            <div className="ficha-item">
              <span>Publicadora</span>
              <strong>{jogo.publisher}</strong>
            </div>

            <div className="ficha-item">
              <span>Lançamento</span>
              <strong>{jogo.release_date}</strong>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
