import React from 'react';
import PropTypes from 'prop-types';
import styles from './controls.module.css';

const Controls = ({ onSubmitTransaction, onChange, inputValue }) => {
  return (
    <section className={styles.controls}>
      <input
        onChange={onChange}
        type="text"
        placeholder="Enter transaction amount..."
        className={styles.input}
        value={inputValue}
      />
      <button
        onClick={onSubmitTransaction}
        name="deposit"
        type="button"
        className={styles.button}
      >
        Deposit
      </button>
      <button
        onClick={onSubmitTransaction}
        name="withdrawal"
        type="button"
        className={styles.button}
      >
        Withdraw
      </button>
    </section>
  );
};

Controls.propTypes = {
  onSubmitTransaction: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  inputValue: PropTypes.string.isRequired,
};

export default Controls;
