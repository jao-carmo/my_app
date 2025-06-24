import React, { useState } from "react";
import { NavLink } from 'react-router-dom';
import styles from '../components/Navbar.module.css';
import logo from '../hamburgueria-faz-o-L.png';
import { useAuthentication } from '../hooks/useAuthentication';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout } = useAuthentication();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
  };

  return (
    <header className={styles['header']}>
      <img src={logo} className={styles['logo']} alt="logo" />
      <nav className={`${styles.Navbar} ${menuOpen ? styles.show : ""}`}>
        <NavLink to="/" onClick={() => setMenuOpen(false)}>Home</NavLink>
        <NavLink to="/store" onClick={() => setMenuOpen(false)}>Lojas</NavLink>
        <NavLink to="/about" onClick={() => setMenuOpen(false)}>Sobre</NavLink>
        <NavLink to="/contact" onClick={() => setMenuOpen(false)}>Contato</NavLink>
        
        {user ? (
          <>
            <NavLink className={styles['login']} to="/painel" onClick={() => setMenuOpen(false)}>Painel</NavLink>
            <button className={styles['logout']} onClick={handleLogout}>Sair</button>
          </>
        ) : (
          <>
            <NavLink className={styles['login']} to="/login" onClick={() => setMenuOpen(false)}>Login</NavLink>
            <NavLink className={styles['login']} to="/register" onClick={() => setMenuOpen(false)}>Cadastre-se</NavLink>
          </>
        )}
      </nav>
      <div className={styles['menu-icon']} onClick={toggleMenu}>
        &#9776;
      </div>
    </header>
  );
}

export default Navbar;