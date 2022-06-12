import React, { useState, useContext } from "react";
import Button from "../../elements/Button";
import InputGroup from "../../elements/inputgroup/InputGroup";
import Footer from "../../layouts/Footer";
import Header from "../../layouts/Header";
import { Context } from "../../helpers/userinfo";

import { Link } from "react-router-dom";

function Login() {
  const [NickOrEmailInputValue, setNickOrEmailInputValue] = useState("");
  const [PasswordInputValue, setPasswordInputValue] = useState("");
  const [UserLogin, setUserlogin] = useContext(Context);

  const handleNickOrEmailChange = (event) => {
    setNickOrEmailInputValue(event.target.value);
  };
  const handlePasswordChange = (event) => {
    setPasswordInputValue(event.target.value);
  };

  const userData = localStorage.getItem("User");
  const obj = JSON.parse(userData);
  const handleSubmit = (event) => {
    if (
      PasswordInputValue === obj[0].password &&
      (NickOrEmailInputValue === obj[0].nick || NickOrEmailInputValue === obj[0].emile)
    ) {
      obj[0].login = true;
      localStorage.setItem("User", JSON.stringify(obj));
      setUserlogin("login success");
      setNickOrEmailInputValue("");
      setPasswordInputValue("");
      event.preventDefault();
    } else if (NickOrEmailInputValue === "" && PasswordInputValue === "") {
      setUserlogin("login error user not logged in");
      event.preventDefault();
    } else if (NickOrEmailInputValue !== obj[0].nick) {
      setUserlogin("login error wrong nick or email");
      event.preventDefault();
    } else if (PasswordInputValue !== obj[0].password) {
      setUserlogin("login error wrong password");
      event.preventDefault();
    }
  };

  return (
    <>
      <Header />
      <div className="App">
        <header className="App-header">
          <p>Zaloguj się</p>
          <form onSubmit={handleSubmit} className={"form"}>
            <InputGroup
              id="Nick"
              type="text"
              label="Nick / E-mail"
              handleChange={handleNickOrEmailChange}
              inputValue={NickOrEmailInputValue}
            />
            <InputGroup
              id="Hasło"
              type="text"
              label="Hasło"
              handleChange={handlePasswordChange}
              inputValue={PasswordInputValue}
            />
            <Button btnType="submit">Zaloguj się</Button>
            <br />
            <Link to="/rp">
              {" "}
              <Button className="remember_password">Przypomnij hasło</Button>
            </Link>
            <div className="error_message">
              {UserLogin === "login error fill in all fields" ? (
                <p>Wypełnij wszystkie pola</p>
              ) : (
                UserLogin === "login error user not logged in"
              )}
              {UserLogin === "login error wrong nick or email" ? (
                <p>Niepoprawny nick lub e-mile !</p>
              ) : (
                UserLogin === "login error user not logged in"
              )}
              {UserLogin === "login error wrong password" ? (
                <p>Niepoprawne hasło !</p>
              ) : (
                UserLogin === "login error user not logged in"
              )}
              {UserLogin === "login success" ? (
                <p className="success">Zostałeś zalogowany</p>
              ) : (
                UserLogin === "login error user not logged in"
              )}
            </div>
          </form>
        </header>
      </div>
      <Footer />
    </>
  );
}

export default Login;
