
const hre = require("hardhat");

async function main() {
  const FaucetToken = await hre.ethers.getContractFactory("FaucetToken");
  const faucet = await FaucetToken.deploy();
  await faucet.deployed();
  console.log("FaucetToken deployed to:", faucet.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
