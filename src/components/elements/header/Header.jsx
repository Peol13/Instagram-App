import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { singOutUser } from 'services/firebase';
import { MainContext } from 'components/contexts/main';
import Button from '../button/Button';

import styles from './style.module.css';

function Header() {
  const navigate = useNavigate();
  const { currentUser } = useContext(MainContext);

  const signOut = () => {
    singOutUser().then(() => navigate('/'));
  };

  return (
    <header className={styles.header}>
      <div className={`container ${styles.headerContainer}`}>
        <Link to="/" className={styles.logo}>
          <h1 className={styles.title}>Instagram App</h1>
        </Link>
        <nav className={styles.navigation}>
          <ul>
            {currentUser ? (
              <>
                   <li>
                  <Link to="/addpost">
                    <Button>Add Post</Button>
                  </Link>
                </li>
                <li>
                  <Link to="/me">
                    <Button>My profile</Button>
                  </Link>
                </li>
                <li>
                  <Button onClick={signOut}>Sign out</Button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/login">
                    <Button>Sign in</Button>
                  </Link>
                </li>
                <li>
                  <Link to="/register">
                    <Button>Sign up</Button>
                  </Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;