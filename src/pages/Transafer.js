import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
const Passbook = () => {
  const [transactionType, setTransactionType] = useState('');
  const [transactionAmount, setTransactionAmount] = useState(0);
  const [successMessage, setSuccessMessage] = useState('');

  const handleTransaction = async (e) => {
    e.preventDefault();

    try {
      // Perform transaction logic based on the selected transaction type
      switch (transactionType) {
        case 'withdraw':
          await performTransaction('withdraw');
          break;
        case 'deposit':
          await performTransaction('deposit');
          break;
        case 'transfer':
          await performTransaction('transfer');
          break;
        default:
          throw new Error('Unsupported transaction type');
      }

      // Update state and show success message
      setSuccessMessage('Transaction successful!');
    } catch (error) {
      console.error('Error performing transaction:', error);
      // Handle errors appropriately
      setSuccessMessage('Transaction successful!');
    }
  };

  const performTransaction = async (transactionType) => {
    const transactionData = {
      account: { accountno: 123 }, // Replace with the actual account data
      receiveraccountno: 456, // Replace with the actual receiver account number for transfer
      amount: transactionAmount,
    };

    await axios.post(`http://localhost:8080/bankapp/transaction/${transactionType}`, transactionData);
  };

  return (
    <div>
      <nav class="navbar navbar-expand-lg navbar-dark bg-info">
<div className="container-fluid">
<h2 className="text-center m-6">Customer Dashboard</h2>
       
  <button className="navbar-toggler" 
  type="button" 
  data-bs-toggle="collapse" 
  data-bs-target="#navbarSupportedContent"
   aria-controls="navbarSupportedContent" 
  aria-expanded="false"
   aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
  <Link type="button" class="btn btn-outline-dark" to="/customer">Customer Home</Link>
     
</div>

</nav>
      <h1 align="center">Bank Transactions</h1>

      <div className="container">
        <div className="row">
          <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
            <h2 className="text-center m-4">Perform Transaction</h2>
            <form onSubmit={handleTransaction}>
              <div className="mb-3">
                <label htmlFor="transactionType" className="form-label">
                  <b>Transaction Type</b>
                </label>
                <select
                  className="form-select"
                  name="transactionType"
                  value={transactionType}
                  onChange={(e) => setTransactionType(e.target.value)}
                  required
                >
                  <option value="" disabled>
                    Select Transaction Type
                  </option>
                  <option value="withdraw">Withdraw</option>
                  <option value="deposit">Deposit</option>
                  <option value="transfer">Transfer</option>
                </select>
              </div>

              <div className="mb-3">
                <label htmlFor="transactionAmount" className="form-label">
                  <b>Transaction Amount</b>
                </label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Enter Transaction Amount"
                  name="transactionAmount"
                  value={transactionAmount}
                  onChange={(e) => setTransactionAmount(e.target.value)}
                  required
                />
              </div>

              <button type="submit" className="btn btn-outline-primary mx-2">
                Submit
              </button>
              <button type="reset" className="btn btn-outline-danger mx-2">
                Reset
              </button>
            </form>

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
