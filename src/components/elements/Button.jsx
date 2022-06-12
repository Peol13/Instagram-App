import React from "react";

import styles from "./style.module.css";

function Button({ bnttype, children }) {
  return (
    <button className={styles.button} type={bnttype}>
      {children}
    </button>
  );
}

export default Button;
