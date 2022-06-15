import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import "./AddPost.css"
import Footer from "../../layouts/Footer";
import Header from "../../layouts/Header";
import Button from "../../elements/Button";
import InputGroup from "../../elements/inputgroup/InputGroup";

import { Context } from "../../helpers/userinfo";

function AddPost() {
  const [post, setPost] = useState([]);
  const [postInfo, setPostInfo] = useContext(Context);
  const [titleInputValue, setTitleInputValue] = useState("");
  const [imgInputValue, setImgInputValue] = useState("");

  const [descriptionInputValue, setDescriptionInputValue] = useState("");

  const [isPostAdded, setIsPostAdded] = useState("");

  const handleTitleChange = (event) => {
    setTitleInputValue(event.target.value);
  };
  const handleImgChange = (event) => {
    setImgInputValue(event.target.value);
  };
  const handleDescriptionChange = (event) => {
    setDescriptionInputValue(event.target.value);
  };

  useEffect(() => {
    const posts = localStorage.getItem("post");
    if (posts) {
      setPost(JSON.parse(posts));
    }
  }, []);

  const date = new Date();
  let time = date.getTime();

  const handleSubmit = (event) => {
    const reImgURL =
    /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g;

    if (titleInputValue === "" || descriptionInputValue === "" || imgInputValue === ""){
      setIsPostAdded("0");
      event.preventDefault();
    }
    else if(titleInputValue.length <= 3 || descriptionInputValue.length <= 3 ){
       setIsPostAdded("1");
       event.preventDefault();
    }
    else if(!reImgURL.test(imgInputValue)){
      setIsPostAdded("2");
  
       event.preventDefault();
    }
   
    else if (titleInputValue !== "" && descriptionInputValue !=="" && imgInputValue !== "") {
      setIsPostAdded("3");
     

      const newPosts = [
        ...post,
        {
          id: time,
          title: titleInputValue,
          img: imgInputValue,
          description: descriptionInputValue,
        },
      ];
      setPost(newPosts);
      setPostInfo("add new post");
      localStorage.setItem("post", JSON.stringify(newPosts));

      window.location.reload(true);
    }
  };

  return (
    <>
      <Header />
      <div className="App">
        <header className="App-header">
          <p>Dodaj post</p>
          <form onSubmit={handleSubmit} className={"form"}>
            <InputGroup
              id="title"
              type="text"
              label="Tytuł"
              handleChange={handleTitleChange}
              inputValue={titleInputValue}
            />
            <InputGroup
              id="img"
              type="text"
              label="Adres url zdjęcia"
              handleChange={handleImgChange}
              inputValue={imgInputValue}
            />
            <InputGroup
              id="description"
              type="text"
              label="Opis"
              handleChange={handleDescriptionChange}
              inputValue={descriptionInputValue}
            />
            <Button btnType="submit">Dodaj post</Button>
             <span className="Form_link"><Link to="/">Zobacz posty</Link></span>

            <div className="error_message">
              {isPostAdded === "0" ? <p>Wypełnij wszystkie pola</p> : isPostAdded === ""}

           

              {isPostAdded === "1" ? <p>Tytuł i opis powinny zawierać  <br /> minimum 3 znaki</p> : isPostAdded === ""}
                 {isPostAdded === "2" ? <p>Niepoprawny format URL <br /> szukaj dalej<br /> lub wklej ten link: <a href="https://www.josera.pl/media/porady-dla-kota-na-lato.jpg">kotek </a> </p> : isPostAdded === ""}
              {isPostAdded === "3" ? (
                <p className="success">Post został dodany</p>
              ) : (
                isPostAdded === ""
              )}
            </div>
               
          </form>
        </header>
      </div>
      <Footer />
    </>
  );
}

export default AddPost;
