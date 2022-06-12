import { React, useContext, useState } from "react";

import endpoints from "consts/endpoints";
import { useNavigate } from "react-router-dom";
import Main from "components/layouts/main/Main";
import InputGroup from "components/elements/input-group/InputGroup";
import Button from "components/elements/button/Button";
import { addFileToStorage, save } from "services/firebase";

import { RestrictedRoute } from "utils/AutorizarionRoutes";
import { MainContext } from "components/contexts/main";

function Addpost() {
  const [title, setTitle] = useState("");
  const [description, setText] = useState("");
  const [file, setFile] = useState(null);
  const [apiError] = useState("");
  const { currentUser } = useContext(MainContext);

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    addFileToStorage(file).then((url) => {
      console.log(currentUser);
      console.log(title);
      console.log(description);
      console.log(url);

      const newPost = {
        title,
        description,
        image: url,
     
        author: {
          name: currentUser.displayName,
          avatar: currentUser.photoURL,
        },
      };

    return  save(endpoints.posts, newPost);
    })

    .then(() => {
      navigate("/dashboard");
    })
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleTextChange = (event) => {
    setText(event.target.value);
  };
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  return (
    <RestrictedRoute>
      {" "}
      <Main>
        <form onSubmit={handleSubmit}>
          <InputGroup
            id="title"
            type="text"
            label="title"
            handleChange={handleTitleChange}
            inputValue={title}
          />
          <InputGroup
            id="description"
            type="text"
            label="description"
            handleChange={handleTextChange}
            inputValue={description}
          />
          <InputGroup id="file" type="file" label="file" handleChange={handleFileChange} />
          <Button btnType="submit">Add post</Button>
          {apiError && <p>{apiError}</p>}
        </form>
      </Main>
    </RestrictedRoute>
  );
}

export default Addpost;
