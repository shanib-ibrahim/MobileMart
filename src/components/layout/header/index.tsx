import React, { useState } from "react";
import { Moon, Sun } from "lucide-react";

import Logo from "../../../assets/images/logo.png";
import LogoDark from "../../../assets/images/logo-dark.png";
import profile from "../../../assets/images/profile.jpg";

import styles from "./header.module.scss";

const Header: React.FC = () => {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  const toggleTheme = () => {
    const body = document.body;
    if (theme === "light") {
      setTheme("dark");
      body.classList.add("dark-theme");
    } else {
      setTheme("light");
      body.classList.remove("dark-theme");
    }
  };

  return (
    <header className={styles.header}>
      <div className={styles["header-left"]}>
        <img
          src={theme === "dark" ? LogoDark : Logo}
          alt="Logo"
          className={styles.logo}
        />
      </div>

      <div className={styles["header-right"]}>
        <div className={styles.profile}>
          <div
            className={`${styles["theme-toggle-wrapper"]} ${
              theme === "dark" ? styles.dark : ""
            }`}
            onClick={toggleTheme}
          >
            <div
              className={`${styles["toggle-circle"]} ${
                theme === "dark" ? styles.dark : ""
              }`}
            >
              {theme === "light" ? <Sun /> : <Moon />}
            </div>
          </div>

          <img src={profile} alt="Profile" className={styles["profile-img"]} />
        </div>
      </div>
    </header>
  );
};

export default Header;
