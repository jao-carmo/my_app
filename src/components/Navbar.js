import React, { useState } from "react";
import { NavLink } from 'react-router-dom';
import styles from '../components/Navbar.module.css';
import logo from '../hamburgueria-faz-o-L.png';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className={styles['header']}>
      <img src={logo} className={styles['logo']} alt="logo" />
      <nav className={`${styles.Navbar} ${menuOpen ? styles.show : ""}`}>
        <NavLink to="/" onClick={() => setMenuOpen(false)}>Home</NavLink>
        <NavLink to="/cardapio" onClick={() => setMenuOpen(false)}>Cardápio</NavLink>
        <NavLink to="/store" onClick={() => setMenuOpen(false)}>Lojas</NavLink>
        <NavLink to="/about" onClick={() => setMenuOpen(false)}>Sobre</NavLink>
        <NavLink to="/contact" onClick={() => setMenuOpen(false)}>Contato</NavLink>
        <NavLink className={styles['login']} to="/login" onClick={() => setMenuOpen(false)}>Login</NavLink>
        <NavLink className={styles['login']} to="/register" onClick={() => setMenuOpen(false)}>Cadastra-se</NavLink>
      </nav>
      <div className={styles['menu-icon']} onClick={toggleMenu}>
        &#9776;
      </div>
    </header>
  );
}

export default Navbar;
