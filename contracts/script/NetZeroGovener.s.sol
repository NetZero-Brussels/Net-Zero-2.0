// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script, console} from "forge-std/Script.sol";
import "@openzeppelin/contracts/governance/TimelockController.sol";
import {IWorldID} from "../src/interfaces/IWorldID.sol";
import {NetZeroGoverner} from "../src/NetZeroGoverner.sol";

contract NetZeroGovenerScript is Script {
    function setUp() public {}

    function run() external {
        // Get the deployer address
        address deployer = vm.envAddress("DEPLOYER_ADDRESS");

        console.log("Deployer address:", deployer);
        
        // Start broadcasting transactions (deployment)
        vm.startBroadcast(deployer);


        // Set the proposers and executors arrays
        address[] memory proposers = new address[](1);
        proposers[0] = deployer;
        address[] memory executors = new address[](1);
        executors[0] = deployer;

        // Deploy the TimelockController with empty proposers and executors arrays
        TimelockController timelockController = new TimelockController(0, proposers, executors, msg.sender);

        // Deploy the WorldID mock or use a real one
        IWorldID worldId = IWorldID(0x42FF98C4E85212a5D31358ACbFe76a621b50fC02); // Replace with the real contract address in production


        // Deploy the NetZeroGovernor contract
        NetZeroGoverner netZeroGovernor = new NetZeroGoverner(
            timelockController,
            worldId,
            "app_staging_3d6b9391a6fc1feba657f05a206f61e0",
            "verify1"
        );

        // End broadcasting transactions
        vm.stopBroadcast();

        // Print the deployed contract addresses
        console.log("TimelockController deployed to:", address(timelockController));
        console.log("NetZeroGovernor deployed to:", address(netZeroGovernor));
    }
}