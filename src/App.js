import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [exchangeRate, setExchangeRate] = useState(1);
  const [currencies, setCurrencies] = useState([]);

  useEffect(() => {
    fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`)
      .then((response) => response.json())
      .then((data) => {
        setCurrencies([data.base, ...Object.keys(data.rates)]);
        setExchangeRate(data.rates[toCurrency]);
      })
      .catch((error) => {
        console.error('Error fetching exchange rates:', error);
      });
  }, [fromCurrency, toCurrency]);

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handleFromCurrencyChange = (e) => {
    setFromCurrency(e.target.value);
  };

  const handleToCurrencyChange = (e) => {
    setToCurrency(e.target.value);
  };

  return (
    <div className="app-container">
      <h2 className="text-center project-heading mt-5">Currency Converter</h2>
      <div className="card shadow-lg mt-3 p-4">
        <div className="row g-3 mb-3">
          <div className="col-md-4">
            <label htmlFor="amount" className="form-label">Amount</label>
            <input
              type="number"
              className="form-control"
              value={amount}
              onChange={handleAmountChange}
              id="amount"
            />
          </div>
          <div className="col-md-4">
            <label htmlFor="fromCurrency" className="form-label">From</label>
            <select
              className="form-select"
              value={fromCurrency}
              onChange={handleFromCurrencyChange}
              id="fromCurrency"
            >
              {currencies.map((currency) => (
                <option key={currency} value={currency}>
                  {currency}
                </option>
              ))}
            </select>
          </div>
          <div className="col-md-4">
            <label htmlFor="toCurrency" className="form-label">To</label>
            <select
              className="form-select"
              value={toCurrency}
              onChange={handleToCurrencyChange}
              id="toCurrency"
            >
              {currencies.map((currency) => (
                <option key={currency} value={currency}>
                  {currency}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12 text-center">
            <h4 className='result'>
              {amount} {fromCurrency} = {(amount * exchangeRate).toFixed(2)} {toCurrency}
            </h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
