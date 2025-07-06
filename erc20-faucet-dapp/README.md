
# 🧴 ERC-20 Token Faucet dApp

This dApp let the user claim free testnet ERC-20 tokens every 24 hours. Built with **Solidity**, **Hardhat**, and **React**.

## Features

- ERC-20 token smart contract (FaucetToken)
- Faucet functionality (rate-limited claiming)
- React frontend to claim tokens & check your balance

## Setup

### 1. Clone & Install

```bash
npm install
```

### 2. Set .env

```env
PRIVATE_KEY=your_wallet_private_key
RPC_URL=https://rpc-mumbai.maticvigil.com
```

### 3. Deploy to Mumbai Testnet

```bash
npx hardhat run scripts/deploy.js --network mumbai
```

Copy the deployed contract address and update `frontend/src/App.js` with:

```js
const contractAddress = "YOUR_DEPLOYED_ADDRESS";
```

### 4. Frontend Setup

```bash
cd frontend
npm install
npm start
```
