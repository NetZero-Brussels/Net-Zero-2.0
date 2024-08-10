// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script, console} from "forge-std/Script.sol";
import {NetZeroGoverner} from "../src/NetZeroGoverner.sol";  // Adjust import path as needed

contract PopulateDaoScript is Script {
    function setUp() public {}

    function run() external {
        // Setup NetZeroGovernor contract from address (assume the contract is already deployed)
        address deployer = vm.envAddress("DEPLOYER_ADDRESS");
        address netZeroGovernorAddress = vm.envAddress("GOVERNOR_ADDRESS_BASE");
        NetZeroGoverner netZeroGovernor = NetZeroGoverner(payable(netZeroGovernorAddress));
        
        // Start broadcasting transactions
        vm.startBroadcast(deployer);

        console.log("Populating NetZeroGovernor contract at address", netZeroGovernorAddress);

        uint256 proposal = netZeroGovernor.proposalThreshold();
        console.log("Proposal Threshold:", proposal);

        // Add 5 institutions
        // for (uint256 i = 0; i < 5; i++) {
        //     string memory institutionName = string(abi.encodePacked("Institution ", i + 1));
        //     address institutionAddress = vm.addr(i + 1);  // Just a mock address for testing
        //     netZeroGovernor.createInstitution(institutionName, institutionAddress);
        //     console.log("Created Institution:", institutionName, "at address", institutionAddress);
        // }

        // // Add 5 projects
        // for (uint256 i = 0; i < 5; i++) {
        //     string memory projectName = string(abi.encodePacked("Project ", i + 1));
        //     address projectAddress = vm.addr(i + 6);  // Just a mock address for testing
        //     uint256 totalVotes = 100 + i * 10;
        //     uint256 certificateId = 1000 + i;
        //     netZeroGovernor.createProject(totalVotes, projectAddress, certificateId, projectName);
        //     console.log("Created Project:", projectName, "at address", projectAddress);
        // }

        // // Add 5 voters
        // for (uint256 i = 0; i < 5; i++) {
        //     string memory voterName = string(abi.encodePacked("Voter ", i + 1));
        //     address voterAddress = vm.addr(i + 11);  // Just a mock address for testing
        //     netZeroGovernor.createVoter(voterName, voterAddress);
        //     console.log("Created Voter:", voterName, "at address", voterAddress);
        // }

        // End broadcasting transactions
        vm.stopBroadcast();
    }
}
