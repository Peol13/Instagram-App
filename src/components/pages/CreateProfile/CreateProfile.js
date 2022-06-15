import React, { useState, useEffect, useContext } from "react";
import Header from "../../layouts/Header";
import Button from "../../elements/Button";
import InputGroup from "../../elements/inputgroup/InputGroup";
import { Link } from "react-router-dom";
import Footer from "../../layouts/Footer";
import { Context } from "../../helpers/userinfo";

function CreateProfile() {
  const [user, setUser] = useState([]);
  const [NameInputValue, setNameInputValue] = useState("");
  const [EmailInputValue, setEmailInputValue] = useState("");
  const [SurnameInputValue, setSurnameInputValue] = useState("");
  const [NickInputValue, setNickInputValue] = useState("");
  const [AvatarInputValue, setAvatarInputValue] = useState("");
  const [PasswordInputValue, setPasswordInputValue] = useState("");
  const [UserCreate, setUserCreate] = useContext(Context);

  useEffect(() => {
    const userData = localStorage.getItem("User");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleNameChange = (event) => {
    setNameInputValue(event.target.value);
  };
  const handleSurnameChange = (event) => {
    setSurnameInputValue(event.target.value);
  };
  const handleEmailChange = (event) => {
    setEmailInputValue(event.target.value);
  };
  const handleNickChange = (event) => {
    setNickInputValue(event.target.value);
  };
  const handleAvatarChange = (event) => {
    setAvatarInputValue(event.target.value);
  };
  const handlePasswordChange = (event) => {
    setPasswordInputValue(event.target.value);
  };

  const handleSubmit = (event) => {
    const reEmile =
      /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    const reAvatarURL =
      /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g;

    const rePassword = /^(?=.*[0-9])(?=.*[A-Z])[a-zA-Z0-9]{6,16}$/;
    if (localStorage.length === 1) {
      setUserCreate("another account exists");
    } else if (
      NameInputValue.length < 3 ||
      SurnameInputValue.length < 3 ||
      EmailInputValue.length < 3 ||
      NickInputValue.length < 3 ||
      AvatarInputValue.length < 3 ||
      PasswordInputValue.length <= 6
    ) {
      setUserCreate("error wrong password or another data format");
    } else if (!reEmile.test(EmailInputValue)) {
      setUserCreate("error wrong email format");
    } else if (!rePassword.test(PasswordInputValue)) {
      setUserCreate("error wrong password format");
    } else if (!reAvatarURL.test(AvatarInputValue)) {
      setUserCreate("error wrong avatar url format");
    } else if (
      localStorage.length === 0 &&
      NameInputValue.length >= 3 &&
      SurnameInputValue.length >= 3 &&
      EmailInputValue.length >= 3 &&
      NickInputValue.length >= 3 &&
      AvatarInputValue.length > 3 &&
      PasswordInputValue.length >= 6 &&
      reEmile.test(EmailInputValue) &&
      rePassword.test(PasswordInputValue)
    ) {
      event.preventDefault();
      setNameInputValue("");
      setSurnameInputValue("");
      setEmailInputValue("");
      setNickInputValue("");
      setAvatarInputValue("");
      setPasswordInputValue("");
      const newUser = [
        ...user,
        {
          name: NameInputValue,
          surmane: SurnameInputValue,
          emile: EmailInputValue,
          nick: NickInputValue,
          avatar: AvatarInputValue,
          password: PasswordInputValue,
          login: false,
        },
      ];
      setUser(newUser);
      localStorage.setItem("User", JSON.stringify(newUser));

      setUserCreate("success account created");
    }
    event.preventDefault();
  };

  return (
    <>
      <Header />

      <div className="App">
        <header className="App-header">
          <p>Stwóż profil</p>
          <form onSubmit={handleSubmit} className={"form"}>
            <InputGroup
              id="Imie"
              type="text"
              label="Imie"
              handleChange={handleNameChange}
              inputValue={NameInputValue}
            />
            <InputGroup
              id="Nazwisko"
              type="text"
              label="Nazwisko"
              handleChange={handleSurnameChange}
              inputValue={SurnameInputValue}
            />
            <InputGroup
              id="E-mail"
              type="text"
              label="E-mail"
              handleChange={handleEmailChange}
              inputValue={EmailInputValue}
            />
            <InputGroup
              id="Nick"
              type="text"
              label="Nick"
              handleChange={handleNickChange}
              inputValue={NickInputValue}
            />
            <InputGroup
              id="Avatar"
              type="text"
              label="link do adresu url avatara"
              handleChange={handleAvatarChange}
              inputValue={AvatarInputValue}
            />
            <InputGroup
              id="Hasło"
              type="text"
              label="Hasło"
              handleChange={handlePasswordChange}
              inputValue={PasswordInputValue}
            />
            <Button btnType="submit">Stwóż</Button>
          </form>
          <div className="error_message">
            {UserCreate === "error another account exists" ? (
              <p>
                Istnieje już inne konto <Link to="/me">Zaloguj się</Link>
              </p>
            ) : (
              UserCreate === "don't create account"
            )}

            {UserCreate === "error wrong password or another data format" ? (
              <p>Użyj minimum 6 znaków dla pola hasło i minimum 3 znaków dla pozostałych pól</p>
            ) : (
              UserCreate === "don't create account"
            )}

            {UserCreate === "error wrong email format" ? (
              <p>Błędny format E-mail. E-mile powinien zawierać znaki: @.</p>
            ) : (
              UserCreate === "don't create account"
            )}

            {UserCreate === "error wrong password format" ? (
              <p>
                Błędny format Hasła. Hasło powinno zawierać conajmniej jedną cyfrę i dużą literę
              </p>
            ) : (
              UserCreate === "don't create account"
            )}

            {UserCreate === "error wrong avatar url format" ? (
              <p>
                Błędny format URL. URL powinno zaczynać się od http:\\ lub https:\\ <br></br> Spróbuj ponownie lub wklej domyślny  <a href="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/User_font_awesome.svg/2048px-User_font_awesome.svg.png"> avatar</a> 
              
                
              </p>
            ) : (
              UserCreate === "don't create account"
            )}

            {UserCreate === "success account created" ? (
              <p className="success">
                Konto utworzone witaj: {user[0].name} <Link to="/me">Zaloguj się</Link>
              </p>
            ) : (
              UserCreate === "don't create account"
            )}
          </div>
        </header>
      </div>
      <Footer />
    </>
  );
}

export default CreateProfile;
