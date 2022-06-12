
import { useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { MainContext } from 'components/contexts/main';

// nie chcemy dopuscic uzytkownika niezalogowanego do np. dashboardu
export function RestrictedRoute({ children }) {
  const { currentUser } = useContext(MainContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      navigate('/');
    }
  }, []);

  return children;
}

RestrictedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

// na stronie glownej, logowania i rejestracji, chcemy przekierowac uzytkownika jak juz jest zalogowany
export function PublicRoute({ children }) {
  const { currentUser } = useContext(MainContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      navigate('/dashboard');
    }
  });

  return children;
}

PublicRoute.propTypes = {
  children: PropTypes.node.isRequired,
};