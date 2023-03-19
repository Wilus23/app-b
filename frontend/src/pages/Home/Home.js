import React from "react";
import styles from "./Home.module.css";
import homeHero from "../../assets/png/home__hero.png";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className={styles.container}>
      <h1>Witaj w App-B 👋...</h1>
      <p>...aplikacji, która pozwoli Ci da większą wolność finansową</p>
      <img src={homeHero} alt="Hero photo" />
      <h4 className={styles.option}>Wybierz potrzebną opcję opcję</h4>
      <div>
        <button className={styles.button}>
          <Link to="/register" className={styles.buttonLink}>
            Zarejestruj się
          </Link>
        </button>
        <Link to="/login" className={styles.link}>
          Zaloguj się
        </Link>
      </div>
    </div>
  );
}
