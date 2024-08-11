// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {SchemaResolver} from "eas-contracts/resolver/SchemaResolver.sol";
import {IEAS, Attestation, AttestationRequest, AttestationRequestData} from "eas-contracts/IEAS.sol";
import { NO_EXPIRATION_TIME, EMPTY_UID } from "eas-contracts/Common.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {Semver,ISemver} from "eas-contracts/Semver.sol";
import {NetZeroGoverner} from "./NetZeroGoverner.sol";

contract NetZeroInstitutionResolver is SchemaResolver {

    NetZeroGoverner private governer;

    // Constructor to initialize the resolver with the EAS contract
    constructor(IEAS eas, NetZeroGoverner _governer) SchemaResolver(eas) {
        governer = _governer;
    }

    /// @notice A resolver callback that processes the attestation and verifies its validity.
    /// @param attestation The new attestation.
    /// @param value number of votes to allocated to the institution
    /// @return Whether the attestation is valid.
    function onAttest(Attestation calldata attestation, uint256 value) internal override returns (bool) {
        require(governer.isInstitutionRegistered(attestation.attester), "NetZeroInstitutionResolver: Sender is not an institution");
        governer.allocateVotesForInstution(attestation.attester, value);
        return true;
    }

    /// @notice Processes an attestation revocation and verifies if it can be revoked.
    /// @param attestation The existing attestation to be revoked.
    /// @param value number of votes to allocated to the institution
    /// @return Whether the attestation can be revoked.
    function onRevoke(Attestation calldata attestation, uint256 value) internal override returns (bool) {
        require(governer.isInstitutionRegistered(attestation.attester), "NetZeroInstitutionResolver: Sender is not an institution");
        governer.allocateVotesForInstution(attestation.attester, value);
        return true;
    }


    // Override the isPayable function if your resolver should accept payments
    function isPayable() public pure override returns (bool) {
        return false;
    }
}

