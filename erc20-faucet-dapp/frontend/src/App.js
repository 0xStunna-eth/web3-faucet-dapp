
import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import faucetABI from './faucetABI.json';

const contractAddress = "";

function App() {
  const [account, setAccount] = useState('');
  const [balance, setBalance] = useState('');
  const [status, setStatus] = useState('');

  useEffect(() => {
    if (account) fetchBalance();
  }, [account]);

  async function connectWallet() {
    if (window.ethereum) {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      setAccount(accounts[0]);
    } else {
      alert('Please install MetaMask');
    }
  }

  async function fetchBalance() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const contract = new ethers.Contract(contractAddress, faucetABI, provider);
    const bal = await contract.balanceOf(account);
    setBalance(ethers.utils.formatEther(bal));
  }

  async function claimTokens() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, faucetABI, signer);
    try {
      const tx = await contract.claim();
      await tx.wait();
      setStatus('Tokens claimed!');
      fetchBalance();
    } catch (err) {
      console.error(err);
      setStatus('Claim failed (maybe cooldown?)');
    }
  }

  return (
    <div>
      <h2>ERC-20 Token Faucet</h2>
      <button onClick={connectWallet}>
        {account ? `Connected: ${account}` : 'Connect Wallet'}
      </button>
      <p>Balance: {balance} FAUCET</p>
      <button onClick={claimTokens}>Claim Tokens</button>
      <p>{status}</p>
    </div>
  );
}

export default App;
