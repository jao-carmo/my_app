import React from "react";
import styles from '../styles/Home.module.css';
import logo from '../hamburgueria-faz-o-L.png';

const Home = () => {
  return (
    <div className={styles.Home}>
      <div className={styles.conteudo}>
        <p>Hamburgueria Faz o L (Se tá caro, não compra!!)</p>
      </div>
    </div>
  );
}
 
export default Home;
