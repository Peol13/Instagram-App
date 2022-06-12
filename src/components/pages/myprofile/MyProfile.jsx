import React, { useContext, useState } from 'react';
import Main from 'components/layouts/main/Main';
import InputGroup from 'components/elements/input-group/InputGroup';
import Button from 'components/elements/button/Button';
import { RestrictedRoute } from 'utils/AutorizarionRoutes';

import { updateProfile } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { MainContext } from 'components/contexts/main';

function MyProfile() {
  const { currentUser } = useContext(MainContext);
  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState('');
  const navigate = useNavigate();

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleAvatarChange = (event) => {
    setAvatar(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    updateProfile(currentUser, {
      displayName: name,
      photoURL: avatar,
    })
      .then(() => {
        navigate('/dashboard');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <RestrictedRoute>
    <Main>
      <form className="form" onSubmit={handleSubmit}>
        <InputGroup
          id="name"
          type="text"
          label="name"
          handleChange={handleNameChange}
          inputValue={name}
        />
        <InputGroup
          id="avatar"
          type="text"
          label="avatar"
          handleChange={handleAvatarChange}
          inputValue={avatar}
        />
        <Button btnType="submit">Save</Button>
      </form>
    </Main>
    </RestrictedRoute>
  );
}

export default MyProfile;