import React, { useState } from "react";
import Button from "../../elements/Button";
import InputGroup from "../../elements/inputgroup/InputGroup";
import Footer from "../../layouts/Footer";
import Header from "../../layouts/Header";    
                                             
                                          

function RemaindPassword() {
  const [EmailInputValue, setEmailInputValue] = useState("");
  const [UserLogin, setUserlogin] = useState("0");

  const handleNickChange = (event) => {
    setEmailInputValue(event.target.value);
  };

  const userData = localStorage.getItem("User");
  const obj = JSON.parse(userData);
  const handleSubmit = (event) => {
    if (EmailInputValue === obj[0].emile) {
      setUserlogin("1");
      setEmailInputValue("");
      event.preventDefault();
    } else if (EmailInputValue === "") {
      setUserlogin("2");
      event.preventDefault();
    } else if(EmailInputValue !== obj[0].emile){
      setUserlogin("3")
      event.preventDefault();
    }
  };

  return (
    <>
      <Header />
      <div className="App">
        <header className="App-header">
          <p>Przypomnij hasło</p>
          <form onSubmit={handleSubmit} className={"form"}>
            <InputGroup
              id="E-mail"
              type="text"
              label="E-mail"
              handleChange={handleNickChange}
              inputValue={EmailInputValue}
            />

            <Button btnType="submit">Przypomnij hasło</Button>
           
            <div className="error_message">
              {UserLogin === "1" ? (
                <p className="success">Hasło do konta '{obj[0].nick}' to '{obj[0].password}'</p>
              ) : (
                UserLogin === ""
              )}
              {UserLogin === "2" ? <p>Wypełnij pole !</p> : UserLogin === ""}
              {UserLogin === "3" ? <p>Konto z podanym e-mile <br></br> nie istnieje</p> : UserLogin === ""}
            </div>
          </form>
        </header>
      </div>
      <Footer />
    </>
  );
}

export default RemaindPassword;
