// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Governor} from "../lib/openzeppelin-contracts/contracts/governance/Governor.sol";
import {GovernorTimelockControl} from "../lib/openzeppelin-contracts/contracts/governance/extensions/GovernorTimelockControl.sol";
import {TimelockController} from "../lib/openzeppelin-contracts/contracts/governance/TimelockController.sol";

contract NetZeroGoverner is Governor, GovernorTimelockControl {
    constructor(TimelockController _timelock)
        Governor("Net Zero Governer")
        GovernorTimelockControl(_timelock)
    {}

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
        // Implement your vote counting logic here
    }
}
