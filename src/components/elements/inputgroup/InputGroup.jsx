import React from "react";

import styles from "./style.module.css";

function InputGroup({ id, type, label, handleChange, inputValue }) {
  return (
    <div className={styles.inputContainer}>
      <label htmlFor={id} className={styles.label}>
        {label}
        <input
          type={type}
          id={id}
          onChange={handleChange}
          value={inputValue}
          className={styles.input}
        />
      </label>
    </div>
  );
}

export default InputGroup;
