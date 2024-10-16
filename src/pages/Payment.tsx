import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Payment() {
  const [balance, setBalance] = useState(0);
  const [amount, setAmount] = useState('');

  useEffect(() => {
    // Fetch user's wallet balance
    axios.get('/api/wallet')
      .then(response => setBalance(response.data.balance))
      .catch(error => console.error("Error fetching wallet balance:", error));
  }, []);

  const handleDeposit = () => {
    axios.post('/api/wallet/deposit', { amount: parseFloat(amount) })
      .then(response => {
        setBalance(response.data.balance);
        setAmount('');
      })
      .catch(error => console.error("Error depositing funds:", error));
  };

  return (
    <div className="max-w-md mx-auto glassmorphic p-6">
      <h2 className="text-2xl font-bold mb-4 neon-text">Payment</h2>
      <div className="mb-4">
        <p className="text-xl">Current Balance: <span className="text-neon-blue">${balance.toFixed(2)}</span></p>
      </div>
      <div className="mb-4">
        <label htmlFor="amount" className="block mb-2">Deposit Amount:</label>
        <input
          type="number"
          id="amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full px-3 py-2 bg-gray-800 bg-opacity-50 rounded text-white"
          min="0"
          step="0.01"
        />
      </div>
      <button
        onClick={handleDeposit}
        className="w-full px-4 py-2 bg-neon-purple bg-opacity-50 rounded hover:bg-opacity-70 transition"
      >
        Deposit
      </button>
    </div>
  );
}

export default Payment;