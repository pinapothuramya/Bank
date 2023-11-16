import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Passbook = () => {
  const [transactionType, setTransactionType] = useState('');
  const [transactionAmount, setTransactionAmount] = useState(0);
  const [successMessage, setSuccessMessage] = useState('');
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetchTransactionHistory();
  }, []);

  const handleTransaction = async (e) => {
    e.preventDefault();

    try {
      switch (transactionType) {
        case 'withdraw':
        case 'deposit':
        case 'transfer':
          await performTransaction(transactionType);
          break;
        default:
          throw new Error('Unsupported transaction type');
      }

      setSuccessMessage('Transaction successful!');

      await fetchTransactionHistory();
    } catch (error) {
      console.error('Error performing transaction:', error);

      setSuccessMessage('Transaction failed!');
    }
  };

  const performTransaction = async (transactionType) => {
    const transactionData = {
      account: { accountno: 123 }, 
      receiveraccountno: 456, 
      amount: transactionAmount,
    };

    await axios.post(`http://localhost:8080/bankapp/transaction/${transactionType}`, transactionData);
  };

  const fetchTransactionHistory = async () => {
    try {
      const response = await axios.get('http://localhost:8080/bankapp/transaction');
      setTransactions(response.data);
    } catch (error) {
      console.error('Error fetching transaction history:', error);
    }
  };

  const staticTransactions = [
    { id: 1, type: 'deposit', amount: 6000, accountno: 123, date: '2023-01-01', time: '10:30 AM' },
    { id: 2, type: 'withdraw', amount: 2300, accountno: 123, date: '2023-01-02', time: '11:45 AM' },
    { id: 3, type: 'transfer', amount: 3090, accountno: 123, date: '2023-01-03', time: '01:15 PM' },
  ];

  return (
    <div>
      <nav class="navbar navbar-expand-lg navbar-dark bg-info">
        <div className="container-fluid">
          <h2 className="text-center m-6">Customer Dashboard</h2>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <Link type="button" class="btn btn-outline-dark" to="/customer">
            Customer Home
          </Link>
        </div>
      </nav>
      <h1 align="center">Bank Transactions</h1>
      <div className="container">
        <div className="row">
          <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
            <h2 className="text-center m-4">Jyothi's Passbook</h2>
            <form onSubmit={handleTransaction}></form>
            <div className="mb-3">
              <label htmlFor="transactionHistory" className="form-label">
                <b>Transaction History</b>
              </label>
              <ul>
                {staticTransactions.map((transaction) => (
                  <li key={transaction.id}>
                    {transaction.type} - Amount: {transaction.amount} - Account No: {transaction.accountno} - Date: {transaction.date} - Time: {transaction.time}
                  </li>
                ))}
              </ul>
            </div>
            {successMessage && (
              <div className="alert alert-success mt-3" role="alert">
                {successMessage}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Passbook;
