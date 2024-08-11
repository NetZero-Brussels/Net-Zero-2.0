// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Test.sol";
import "../src/NetZeroGoverner.sol";
import "@openzeppelin/contracts/governance/TimelockController.sol";
import {IEAS, Attestation, AttestationRequest, AttestationRequestData} from "eas-contracts/IEAS.sol";


contract NetZeroGovernorTest is Test {
    NetZeroGoverner public netZeroGovernor;
    TimelockController public timelockController;
    IEAS public eas;

    address public owner;
    address public addr1;
    address public addr2;
    address public addr3;

    address public addr4;

    // Mock IWorldID contract
    IWorldID public worldIdMock;


    function setUp() public {
        owner = address(this);
        addr1 = vm.addr(1);
        addr2 = vm.addr(2);
        addr3 = vm.addr(3);

        addr4 = vm.addr(3);

        // Deploy TimelockController
        address[] memory proposers = new address[](1);
        proposers[0] = owner;
        address[] memory executors = new address[](1);
        executors[0] = owner;

        timelockController = new TimelockController(0, proposers, executors, msg.sender);
        eas = IEAS(address(addr4));



        // Deploy mock WorldID
        worldIdMock = IWorldID(address(new WorldIDMock()));

        // Deploy NetZeroGoverner contract
        netZeroGovernor = new NetZeroGoverner(
            timelockController,
            worldIdMock,
            "testAppId",
            "testActionId",
            eas
        );
    }

    function testCreateInstitution() public {
        netZeroGovernor.createInstitution("Test Institution", addr1);
        (uint64 id, string memory name, uint256 totalVoteAllocation, address wallet, uint256 timestamp, uint256 funds) = netZeroGovernor.addressToInstitution(addr1);

        assertEq(id, 1);
        assertEq(name, "Test Institution");
        assertEq(wallet, addr1);
        assertTrue(timestamp > 0);
    }

    function testCreateProject() public {
        netZeroGovernor.createProject(100, addr2, 12345, "Test Project");
        (uint64 id, uint256 totalVotes, string memory name, address wallet, uint256 timestamp, uint256 certificateId) = netZeroGovernor.projectIdToProject(1);

        assertEq(id, 1);
        assertEq(totalVotes, 100);
        assertEq(name, "Test Project");
        assertEq(wallet, addr2);
        assertEq(certificateId, 12345);
        assertTrue(timestamp > 0);
    }

    function testCreateVoter() public {
        netZeroGovernor.createVoter("Test Voter", addr3);
        (uint64 id, uint256 nullifierHash, string memory name, uint64 totalVotes, uint64 successfulVotes, uint64 allocatedVotes, uint256 timestamp, address wallet) = netZeroGovernor.addressToVoter(addr3);

        assertEq(id, 1);
        assertEq(name, "Test Voter");
        assertEq(wallet, addr3);
        assertTrue(timestamp > 0);
    }

    function testVotingEnabledOverride() public {
        netZeroGovernor.setVotingEnabledOverride(false);
        assertFalse(netZeroGovernor.votingEnabled());
        
        netZeroGovernor.setVotingEnabledOverride(true);
        assertTrue(netZeroGovernor.votingEnabled());
    }

    function testIsVoterRegistered() public {
        netZeroGovernor.createVoter("Test Voter", addr3);
        assertTrue(netZeroGovernor.isVoterRegistered(addr3));
        assertFalse(netZeroGovernor.isVoterRegistered(addr2));
    }

    function testIsInstitutionRegistered() public {
        netZeroGovernor.createInstitution("Test Institution", addr1);
        assertTrue(netZeroGovernor.isInstitutionRegistered(addr1));
        assertFalse(netZeroGovernor.isInstitutionRegistered(addr2));
    }

    function testIsProjectRegistered() public {
        netZeroGovernor.createProject(100, addr2, 12345, "Test Project");
        assertTrue(netZeroGovernor.isProjectRegistered(1));
        assertFalse(netZeroGovernor.isProjectRegistered(2));
    }
}

contract WorldIDMock is IWorldID {
    function verifyProof(
        uint256 root,
        uint256 groupId,
        uint256 signal,
        uint256 nullifierHash,
        uint256 externalNullifier,
        uint256[8] calldata proof
    ) external pure override {
        // Mock verification logic
    }
}