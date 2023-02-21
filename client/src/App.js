import { donateEther, requestFunding, checkBalance } from './web3';
import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import './App.css'

function App() {
  const [userAddress, setUserAddress] = useState('');
  const [amount, setAmount] = useState('0');
  const [balance, setBalance] = useState('(Please call for Check Balance)');
  const contractAddress = "0x7805E5dF0aE55402c969d1c6f9bdD4D1784b89C3"

  useEffect(() => {
    async function getAccounts() {
      // get the contract address and user account from MetaMask
      const web3 = new Web3(Web3.givenProvider);
      const accounts = await web3.eth.getAccounts();
      setUserAddress(accounts[0]);
    }
    getAccounts();
  }, []);


  useEffect(() => {
    checkBalance(setBalance);
  }, [userAddress]);

  const handleDonation = async () => {
    await window.ethereum.enable();
    donateEther(amount);
  }

  const handleFundingRequest = async () => {
    await window.ethereum.enable();

    requestFunding(contractAddress, userAddress, amount);
  }

  const handleBalanceCheck = async () => {

    checkBalance(setBalance);
  }

  return (
    <div className="App">
      <h1>Charity Dapp </h1>
      <label className="amount-label">

        Amount:
        <input type="text" value={amount} onChange={e => setAmount(e.target.value)} />
      </label>
      <div className="buttons-container">
        <button onClick={handleDonation}>Donate</button>

        <button onClick={handleFundingRequest}>Request Funding</button>
      </div>
      <button onClick={handleBalanceCheck}>Check Balance</button>


      <h2>Balance: {balance} Eth</h2>
    </div>
  );
}

export default App;