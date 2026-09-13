import React from "react";
import { Outlet, NavLink } from "react-router-dom";
import { CgGames } from "react-icons/cg";
import { FiHome, FiGrid, FiHeart } from "react-icons/fi";

export default function Layout({ favoritos, setFavoritos }) {
  return (
    <div className="site">
      <header className="cabecalho">
        <NavLink to="/" className="cabecalho-logo">
          <CgGames />
          <span>GameX</span>
        </NavLink>

        <nav className="cabecalho-nav">
          <NavLink
            end
            className={({ isActive }) => `nav-link ${isActive ? "ativo" : ""}`}
            to="/"
          >
            <FiHome />
            <span>Início</span>
          </NavLink>

          <NavLink
            className="nav-link"
            to="/"
          >
            <FiGrid />
            <span>Jogos</span>
          </NavLink>

          <NavLink
            className={({ isActive }) => `nav-link ${isActive ? "ativo" : ""}`}
            to="/favoritos"
          >
            <FiHeart />
            <span>Favoritos</span>
          </NavLink>
        </nav>
      </header>

      <main>
        <Outlet
          context={{
            favoritos,
            setFavoritos,
          }}
        />
      </main>

      <footer className="rodape">
        <p>GameX — Descubra novos jogos.</p>
      </footer>
    </div>
  );
}
