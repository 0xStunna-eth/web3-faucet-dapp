
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract FaucetToken is ERC20, Ownable {
    uint256 public constant DRIP_AMOUNT = 100 * 10**18;
    uint256 public constant COOLDOWN = 1 days;

    mapping(address => uint256) public lastClaimed;

    constructor() ERC20("FaucetToken", "FAUCET") {
        _mint(msg.sender, 1000000 * 10**18);
    }

    function claim() external {
        require(block.timestamp - lastClaimed[msg.sender] >= COOLDOWN, "Wait 24h before next claim");
        lastClaimed[msg.sender] = block.timestamp;
        _transfer(owner(), msg.sender, DRIP_AMOUNT);
    }
}
