import React from "react";
import AccountBalance from "../../components/ui/Balance";
import styles from "./Dashboard.module.css";
import { Link } from "react-router-dom";
import dashboard__chart from "../../assets/png/dashboard__chart.svg";
import History from "../History/History";

const Dashboard = () => {
  return (
    <div className={styles.wrapper}>
      <h1>Witaj użytkowniku!</h1>
      <div className={styles.row}>
        <AccountBalance />
        <div className={styles.special__wrapper} style={{ marginRight: 40 }}>
          <div>
            <p style={{ color: "white" }}>
              Zobacz specjalne
              <br /> wydatki miesięczne
            </p>
            <Link to="/specialTransactions" className={styles.buttonLink}>
              <button className={styles.button__earning}>
                Specjalne wydatki
              </button>
            </Link>
          </div>
          <img src={dashboard__chart} alt="telefon" width={150} />
        </div>
      </div>
      <div style={{ width: "50%" }}>
        <History />
      </div>
    </div>
  );
};

export default Dashboard;
