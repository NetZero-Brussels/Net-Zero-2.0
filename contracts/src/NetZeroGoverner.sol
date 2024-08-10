// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Governor} from "@openzeppelin/contracts/governance/Governor.sol";
import {GovernorTimelockControl} from "@openzeppelin/contracts/governance/extensions/GovernorTimelockControl.sol";
import {TimelockController} from "@openzeppelin/contracts/governance/TimelockController.sol";
import {IWorldID} from "./interfaces/IWorldID.sol";
import { ByteHasher } from './helpers/ByteHasher.sol';

contract NetZeroGoverner is Governor, GovernorTimelockControl {
    using ByteHasher for bytes;

    struct Project {
        uint64 projectId;
        uint256 totalVotes;
        string name;
        address wallet;
        uint256 timestamp;
        uint256 certificateId; // points the nft certificate given from energy web RAC
    }

    struct Voter {
        uint64 voterId;
        uint256 nullifierHash;
        string name;
        uint64 totalVotes;
        uint64 successfulVotes;
        uint64 allocatedVotes;
        uint256 timestamp;
        address wallet;
    }

    struct Institution {
        uint64 institutionId;
        string name;
        uint64 totalVoteAllocation;
        address wallet;
        uint256 timestamp;
    }
    
    mapping(address => Voter) public addressToVoter;
    mapping(uint64 => Project) public projectIdToProject;
    mapping(address => Institution) public addressToInstitution;

    uint64 private voterIndex;
    uint64 private projectIndex;
    uint64 private institutionIndex;

    event VoterCreated(uint64 voterId, string name);
    event ProjectCreated(uint64 projectId, string name, uint256 certificateId);
    event InstitutionCreated(uint64 institutionId, string name);


    uint256 public totalVotesInSession;
    IWorldID private worldId;

    uint256 internal immutable externalNullifier;
	mapping(uint256 => bool) internal nullifierHashes;

	error DuplicateNullifier(uint256 nullifierHash);

    bool private votingEnabledOverride;

    uint256 internal immutable groupId = 1;


    address private _owner;

    modifier onlyOwner() {
        require(msg.sender == _owner, "Caller is not the owner");
        _;
    }

    constructor(TimelockController _timelock,IWorldID _worldId, string memory _appId, string memory _actionId)
        Governor("Net Zero Governer")
        GovernorTimelockControl(_timelock)
    {
        worldId = _worldId;
		externalNullifier = abi.encodePacked(abi.encodePacked(_appId).hashToField(), _actionId).hashToField();
        totalVotesInSession = 0;
        votingEnabledOverride = true;

        _owner = msg.sender;

        voterIndex = 0;
        projectIndex = 0;
        institutionIndex = 0;
    }

    function resetVotingSession() public onlyOwner() {
        totalVotesInSession = 0;
    }


    function createInstitution(string memory name, address walletAddress) public {

        institutionIndex += 1;
        
        addressToInstitution[walletAddress] = Institution({
            institutionId: institutionIndex,
            name: name,
            totalVoteAllocation: 0,
            wallet: walletAddress,
            timestamp: block.timestamp
        });

        emit InstitutionCreated(institutionIndex, name);
    }

    function createProject(uint256 totalVotes, address walletAddress, uint256 certificateId, string memory name) public {
        
        projectIndex += 1;
        
        projectIdToProject[projectIndex] = Project({
            projectId: projectIndex,
            totalVotes: totalVotes,
            name: name,
            wallet: walletAddress,
            certificateId: certificateId,
            timestamp: block.timestamp
        });

        emit ProjectCreated(projectIndex, name, certificateId);

    }

    function createVoter(string memory name, address walletAddress) public {

        voterIndex += 1;

        addressToVoter[walletAddress] = Voter({
            voterId: voterIndex,
            nullifierHash: 0,
            name: name,
            totalVotes: 0,
            successfulVotes: 0,
            allocatedVotes: 0,
            timestamp: block.timestamp,
            wallet: walletAddress
        });

        emit VoterCreated(voterIndex, name);
    }

    function isVoterRegistered(address userAddress) public view returns (bool) {
        return addressToVoter[userAddress].timestamp != 0;
    }

    function isInstitutionRegistered(address institutionAddress) public view returns (bool) {
        return addressToInstitution[institutionAddress].timestamp != 0;
    }

    function isProjectRegistered(uint64 projectId) public view returns (bool) {
        return projectIdToProject[projectId].timestamp != 0;
    }

    function allocateVotes(address voterAddress, uint64 votes) public onlyOwner() {
        require(addressToVoter[voterAddress].timestamp != 0, "Voter does not exist");
        require(votes > 0, "Votes must be greater than 0");

        addressToVoter[voterAddress].allocatedVotes += votes;
    }

    function institutionDepositForVotes() payable public {
        require(addressToInstitution[msg.sender].timestamp != 0, "Institution does not exist");
        // check for usdc
        require(msg.value > 0, "Deposit amount must be greater than 0");

        // divide by 1000 to get the amount of votes
        // addressToInstitution[msg.sender].totalVoteAllocation = totalVoteAllocation;
    }

    function verifyAndExecuteVote(
        address signal,
        uint256 root,
        uint256 nullifierHash,
        uint256[8] calldata proof,
        uint64 projectId,
        uint64 voteCount
    ) public {

        require(addressToVoter[msg.sender].allocatedVotes >= voteCount, "Insufficient votes allocated");
        require(block.timestamp < votingPeriod(), "Voting period has ended");
        require(votingEnabled(), "Voting is disabled");

        // Check Uniqueness
        if (nullifierHashes[nullifierHash]) revert DuplicateNullifier(nullifierHash);

        // Verify User has a valid World ID
        worldId.verifyProof(
            root,
            groupId, // set to "1" in the constructor
            abi.encodePacked(signal).hashToField(),
            nullifierHash,
            externalNullifier,
            proof
        );

        nullifierHashes[nullifierHash] = true;


        // Execute the vote
        totalVotesInSession += voteCount;
        addressToVoter[msg.sender].allocatedVotes -= voteCount;
        addressToVoter[msg.sender].totalVotes += voteCount;
        projectIdToProject[projectId].totalVotes += voteCount;
    }

    function setVotingEnabledOverride(bool enabled) public onlyOwner() {
        votingEnabledOverride = enabled;
    }


    function votingEnabled() public view returns (bool) {
        return block.timestamp >= votingDelay() || votingEnabledOverride;
    }

    function votingDelay() public pure virtual override returns (uint256) {
        return 1 days;
    }

    function votingPeriod() public pure virtual override returns (uint256) {
        return 1 weeks;
    }

    function proposalThreshold() public pure virtual override returns (uint256) {
        return 0;
    }

    function quorum(uint256 timepoint) public view virtual override returns (uint256) {
        return 0;
    }

    function _getVotes(address account, uint256 timepoint, bytes memory params) internal view virtual override returns (uint256) {
        return 0;
    }

    function _quorumReached(uint256 proposalId) internal view virtual override returns (bool) {
        return false;
    }

    function _voteSucceeded(uint256 proposalId) internal view virtual override returns (bool) {
        return false;
    }

    function hasVoted(uint256 proposalId, address account) public view virtual override returns (bool) {
        return false;
    }

    function CLOCK_MODE() public view virtual override returns (string memory) {
        return "timestamp";
    }

    function clock() public view virtual override returns (uint48) {
        return uint48(block.timestamp);
    }

    function COUNTING_MODE() public view virtual override returns (string memory) {
        return "simple";
    }

    function state(uint256 proposalId) public view override(Governor, GovernorTimelockControl) returns (ProposalState) {
        return super.state(proposalId);
    }

    function proposalNeedsQueuing(
        uint256 proposalId
    ) public view virtual override(Governor, GovernorTimelockControl) returns (bool) {
        return super.proposalNeedsQueuing(proposalId);
    }

    function _queueOperations(
        uint256 proposalId,
        address[] memory targets,
        uint256[] memory values,
        bytes[] memory calldatas,
        bytes32 descriptionHash
    ) internal override(Governor, GovernorTimelockControl) returns (uint48) {
        return super._queueOperations(proposalId, targets, values, calldatas, descriptionHash);
    }

    function _executeOperations(
        uint256 proposalId,
        address[] memory targets,
        uint256[] memory values,
        bytes[] memory calldatas,
        bytes32 descriptionHash
    ) internal override(Governor, GovernorTimelockControl) {
        super._executeOperations(proposalId, targets, values, calldatas, descriptionHash);
    }

    function _cancel(
        address[] memory targets,
        uint256[] memory values,
        bytes[] memory calldatas,
        bytes32 descriptionHash
    ) internal override(Governor, GovernorTimelockControl) returns (uint256) {
        return super._cancel(targets, values, calldatas, descriptionHash);
    }

    function _executor() internal view override(Governor, GovernorTimelockControl) returns (address) {
        return super._executor();
    }

    function _countVote(
        uint256 proposalId,
        address account,
        uint8 support,
        uint256 weight,
        bytes memory params
    ) internal virtual override {
    }
}
