// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC4626.sol";
import "@superform/eth/contracts/interfaces/IStrategy.sol";
import "@superform/eth/contracts/interfaces/IVault.sol";

contract SuperformVault is ERC4626 {
    IStrategy public strategy;

    constructor(IERC20 asset, IStrategy _strategy)
        ERC4626(asset, "Superform Vault Token", "SVT")
    {
        strategy = _strategy;
    }

    function totalAssets() public view override returns (uint256) {
        return strategy.totalAssets();
    }

    function deposit(uint256 assets, address receiver) public override returns (uint256 shares) {

    }

    function withdraw(uint256 assets, address receiver, address owner) public override returns (uint256 shares) {
    }

    // Vault system needs to be designed
}
