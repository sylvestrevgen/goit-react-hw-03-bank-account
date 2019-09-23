import React from 'react';
import PropTypes from 'prop-types';
import styles from './transactionHistory.module.css';

const TransactionHistory = ({ transactions }) => {
  const tableItems = transactions.map(({ id, type, amount, date }) => (
    <tr key={id}>
      <td className={styles.td}>{type}</td>
      <td className={styles.td}>{`${amount}$`}</td>
      <td className={styles.td}>{date}</td>
    </tr>
  ));

  return (
    <table className={styles.history}>
      <thead>
        <tr className={styles.tr}>
          <th className={styles.th}>Transaction</th>
          <th className={styles.th}>Amount</th>
          <th className={styles.th}>Date</th>
        </tr>
      </thead>
      {transactions && <tbody>{tableItems}</tbody>}
    </table>
  );
};

TransactionHistory.propTypes = {
  transactions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      amount: PropTypes.number.isRequired,
      date: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
};

export default TransactionHistory;
