import React from 'react';
import PropTypes from 'prop-types';
import styles from './balance.module.css';

const Balance = ({ balance, expenses, incomes }) => {
  return (
    <section className={styles.balance}>
      <span className={styles.span}>
        <span className={styles.arrowDown} role="img" aria-label="arrow">
          ⬇️
        </span>
        {`${expenses}$`}
      </span>
      <span className={styles.span}>
        <span className={styles.arrowUp} role="img" aria-label="arrow">
          ⬆️
        </span>
        {`${incomes}$`}
      </span>
      <span className={styles.span}>{`Balance: ${balance}$`}</span>
    </section>
  );
};

Balance.propTypes = {
  balance: PropTypes.number.isRequired,
  expenses: PropTypes.number.isRequired,
  incomes: PropTypes.number.isRequired,
};

export default Balance;
