import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

function Header() {
  // const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('user')));
  const [token, setToken] = useState(() => localStorage.getItem('token'));

  const handleLogout = () => {
    localStorage.clear();
  };

  return (
    <>
      <nav className="navBarItems">
        <Link className="home-title" to="/">
          <h1 className="navbar-logo">
            TaskManeger
          </h1>
        </Link>
        <ul className="nav-menu">
          <li>
            <Link
              className="nav-links"
              to="/"
            >
              {token && 'Início'}
            </Link>
          </li>
          <li>
            <Link
              className="nav-links"
              to={token ? '/config' : '/login'}
            >
              {token ? 'Minha Conta' : 'Login'}
            </Link>
          </li>
          <li>
            <Link
              className="nav-links"
              to="/signup"
            >
              {!token && 'Crie sua conta'}
            </Link>
          </li>
          <li>
            <Link
              onClick={handleLogout}
              className={token ? 'nav-links' : 'links-off'}
              to="/login"
            >
              Sair
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default Header;
