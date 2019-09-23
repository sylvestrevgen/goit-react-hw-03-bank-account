import React, { Component } from 'react';
import shortid from 'shortid';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from './dashboard.module.css';
import Controls from '../Controls/Controls';
import Balance from '../Balance/Balance';
import TransactionHistory from '../TransactionHistory/TransactionHistory';

export default class Dashboard extends Component {
  state = {
    transactions: [],
    balance: 0,
    inputValue: '',
  };

  componentDidMount() {
    const transactionsLS = localStorage.getItem('transactions');
    const balanceLS = localStorage.getItem('balance');

    if (transactionsLS && balanceLS) {
      this.setState({
        transactions: JSON.parse(transactionsLS),
        balance: JSON.parse(balanceLS),
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { transactions, balance } = this.state;
    if (prevState.transactions !== transactions) {
      localStorage.setItem('transactions', JSON.stringify([...transactions]));
      localStorage.setItem('balance', JSON.stringify(balance));
    }
  }

  handleSubmit = event => {
    const newTransaction = {
      id: shortid.generate(),
      type: event.target.name,
      amount: Number(this.state.inputValue),
      date: new Date().toLocaleString('en-US'),
    };

    if (
      newTransaction.type === 'withdrawal' &&
      this.state.inputValue > this.state.balance
    ) {
      toast('На счету недостаточно средств для проведения операции!');
      return;
    }

    if (newTransaction.amount === 0 || !newTransaction.amount) {
      toast('Введите сумму для проведения операции!');
      return;
    }

    this.setState(state => ({
      transactions: [...state.transactions, newTransaction],
      balance:
        newTransaction.type === 'deposit'
          ? Math.round(
              parseFloat(state.balance + newTransaction.amount) * 100,
            ) / 100
          : Math.round(
              parseFloat(state.balance - newTransaction.amount) * 100,
            ) / 100,
      inputValue: '',
    }));
  };

  handleInputChange = event => {
    if (/^\d*[.]?\d{0,2}$/.test(event.target.value)) {
      this.setState({
        inputValue: event.target.value,
      });
    }
  };

  render() {
    const { transactions, balance, inputValue } = this.state;

    const incomes = [...transactions].reduce((acc, item) => {
      if (item.type === 'deposit') {
        return acc + item.amount;
      }
      return acc;
    }, 0);

    const expenses = [...transactions].reduce((acc, item) => {
      if (item.type === 'withdrawal') {
        return acc + item.amount;
      }
      return acc;
    }, 0);

    return (
      <div className={styles.dashboard}>
        <Controls
          onSubmitTransaction={this.handleSubmit}
          onChange={this.handleInputChange}
          inputValue={inputValue}
        />
        <ToastContainer />
        <Balance balance={balance} incomes={incomes} expenses={expenses} />
        <TransactionHistory transactions={transactions} />
      </div>
    );
  }
}
