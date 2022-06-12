import React from 'react';
import PropTypes from 'prop-types';

import styles from './style.module.css';

function Button({ btnType, children, onClick}) {
  return (
    <button className={styles.button} type={btnType} onClick={onClick}>
      {children}
    </button>
  );
}

Button.defaultProps = {
  btnType: 'button',
  children: null,
  onClick: null,
};

Button.propTypes = {
  btnType: PropTypes.string,
  children: PropTypes.node,
  onClick: PropTypes.func,
};

export default Button;
