import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from 'services/firebase';

export const MainContext = React.createContext({
  currentUser: null,
});

// Context sklada sie z 2 czesci

// MainContext.Provider - okresla zakres, w ktorym beda dostepne dane z kontekstu
// MainContext.Consumer - okresla miejsce, z ktorego chcemy pobrac dane z kontekstu

export function MainContextProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  onAuthStateChanged(auth, (user) => {
    if (!currentUser && user) setCurrentUser(user);
    if (currentUser && !user) setCurrentUser(null);
    setIsLoading(false);
  });

  if (isLoading) return <p>Loading...</p>;

  return (
    <MainContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{
        currentUser,
      }}
    >
      {children}
    </MainContext.Provider>
  );
}

MainContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};