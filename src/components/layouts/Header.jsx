import React, { useState, useEffect, useContext } from "react";
import logo from "./logo.svg";
import { Link } from "react-router-dom";
import { Context } from "../helpers/userinfo";

import styles from "./style.module.css";

function Header() {
  const [user, setUser] = useState([{ login: false }]);
  const [setUserInfo] = useContext(Context);

  const userData = localStorage.getItem("User");

  const obj = JSON.parse(userData);
  useEffect(() => {
    if (userData) {
      setUser(obj);
    }
  }, [obj]);

  const logout = (event) => {
    obj[0].login = false;
    localStorage.setItem("User", JSON.stringify(obj));
    setUser(obj);
    setUserInfo("user Logout");
    event.preventDefault();
  };

  const remove = (event) => {
    localStorage.removeItem("User");
    localStorage.removeItem("post");
    setUser(obj);
    setUserInfo("user remove account");
    event.preventDefault();
  };

  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <Link to="/" className={styles.logo}>
          <h1 className={styles.title}>
            <img src={logo} className="App-logo" alt="logo" />
            Instagram App{" "}
          </h1>
        </Link>
        <nav className={styles.navigation}>
          <ul>
            {user[0].login === true ? <li>Witaj {user[0].nick} </li> : <></>}

            {user[0].login === true ? (
              <>
                <li>
                  <Link to="/ap">Dodaj post</Link>
                </li>
                <li>
                  <span className={styles.delete}>
                    <a href="/" onClick={remove}>
                      Usuń konto
                    </a>
                  </span>{" "}
                  <a href="/" onClick={logout}>
                    Wyloguj
                  </a>
                </li>
              </>
            ) : (
              <></>
            )}

            {user[0].nick === undefined ? (
              <li>
                <Link to="/ca">Stwórz konto</Link>
              </li>
            ) : (
              <></>
            )}
            {user[0].nick !== undefined && user[0].login === false ? (
              <li>
                <Link to="/me">Zaloguj się</Link>
              </li>
            ) : (
              <></>
            )}
          </ul>
        </nav>
      </header>
    </div>
  );
}

export default Header;
