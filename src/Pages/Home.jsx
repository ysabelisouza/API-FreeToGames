import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiArrowRight, FiPlay } from "react-icons/fi";
import CardGames from "../Components/CardGames";
import BarraDeBusca from "../Components/BarraDeBusca";

export default function Home() {
  const [jogos, setJogos] = useState([]);
  const [busca, setBusca] = useState("");
  const [genero, setGenero] = useState("");
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    async function buscarJogos() {
      const response = await fetch("https://www.freetogame.com/api/games");
      const dados = await response.json();
      setJogos(dados);
      setCarregando(false);
    }

    buscarJogos();
  }, []);

  const jogosFiltrados = jogos.filter(
    (jogo) =>
      jogo.title.toLowerCase().includes(busca.toLowerCase()) &&
      (genero === "" || jogo.genre === genero)
  );

  const jogoDestaque = jogos[0];

  const generos = [
    { nome: "Todos", valor: "" },
    { nome: "MMORPG", valor: "MMORPG" },
    { nome: "Shooter", valor: "Shooter" },
    { nome: "MOBA", valor: "MOBA" },
    { nome: "Estratégia", valor: "Strategy" },
    { nome: "Racing", valor: "Racing" },
  ];

  return (
    <section className="home">
      {jogoDestaque && (
        <section
          className="hero"
          style={{
            backgroundImage: `linear-gradient(90deg, rgba(7, 8, 15, 0.98) 0%, rgba(7, 8, 15, 0.88) 40%, rgba(7, 8, 15, 0.25) 100%), url(${jogoDestaque.thumbnail})`,
          }}
        >
          <div className="hero-conteudo">
            <span className="hero-label">JOGO EM DESTAQUE</span>

            <h1 className="hero-titulo">
              Descubra
              <strong>Novos Mundos</strong>
            </h1>
            <p className="hero-subtitulo">
              Explore jogos gratuitos, encontre seus favoritos
              e descubra sua próxima aventura.
            </p>
            <div className="hero-destaque">
              <span>{jogoDestaque.genre}</span>
              <span>{jogoDestaque.platform}</span>
            </div>
            <Link
              to={`/item/${jogoDestaque.id}`}
              className="botao-principal"
            >
              <FiPlay />
              Ver jogo
              <FiArrowRight />
            </Link>
          </div>
        </section>
      )}

      <section className="catalogo">
        <div className="catalogo-topo">
          <div>
            <span className="pequeno-titulo">EXPLORE O CATÁLOGO</span>
            <h2 className="titulo-secao">Jogos em alta</h2>
            <p className="subtitulo-secao">
              Encontre jogos gratuitos para começar uma nova aventura.
            </p>
          </div>
        </div>

        <div className="filtros">
          <BarraDeBusca
            busca={busca}
            setBusca={setBusca}
          />

          <div className="chips">
            {generos.map((item) => (
              <button
                key={item.valor}
                className={`chip ${
                  genero === item.valor ? "ativo" : ""
                }`}
                onClick={() => setGenero(item.valor)}
              >
                {item.nome}
              </button>
            ))}
          </div>
        </div>

        {carregando ? (
          <p className="mensagem-estado">Carregando jogos...</p>
        ) : jogosFiltrados.length === 0 ? (
          <p className="mensagem-estado">
            Nenhum jogo encontrado.
          </p>
        ) : (
          <div className="grade-jogos">
            {jogosFiltrados.map((jogo) => (
              <CardGames
                key={jogo.id}
                jogo={jogo}
              />
            ))}
          </div>
        )}
      </section>
    </section>
  );
}
