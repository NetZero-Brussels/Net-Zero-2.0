
source ../.env
forge script script/NetZeroGovener.s.sol:NetZeroGovenerScript --rpc-url $BASE_SEPOLIA_RPC_URL --etherscan-api-key $ETHERSCAN_API_KEY --verify --verifier-url $VERIFY_URL --broadcast --private-key $PRIVATE_KEY
forge script script/NetZeroGovener.s.sol:NetZeroGovenerScript --rpc-url $BASE_SEPOLIA_RPC_URL --etherscan-api-key $ETHERSCAN_API_KEY --verify --broadcast --private-key $PRIVATE_KEY
forge script script/NetZeroGovener.s.sol:NetZeroGovenerScript --rpc-url $BASE_SEPOLIA_RPC_URL --etherscan-api-key $ETHERSCAN_API_KEY --verify --broadcast --private-key $PRIVATE_KEY

forge script script/NetZeroGovener.s.sol:NetZeroGovenerScript \
  --rpc-url $BASE_SEPOLIA_RPC_URL \
  --private-key $PRIVATE_KEY \
  --broadcast \
  --verify \
  --verifier blockscout \
  --verifier-url 'https://base-sepolia.blockscout.com/api/'


# forge verify-contract \
#   --rpc-url https://sepolia.base.org \
#   --verifier blockscout \
#   --verifier-url 'https://base-sepolia.blockscout.com/api/' \
#   0x2f26b0975F0f7fCB5b9F20dA11EE1C372BAa54F7 \
#   NetZeroGoverner.sol:NetZeroGoverner


forge script script/PopulateDao.s.sol:PopulateDaoScript --rpc-url $RPC_URL --broadcast --private-key $PRIVATE_KEY
forge script script/PopulateDao.s.sol:PopulateDaoScript --rpc-url $BASE_SEPOLIA_RPC_URL --broadcast --private-key $PRIVATE_KEY

# cast to update allocated votes
    # function allocateVotes(address voterAddress, uint64 votes) public onlyOwner() 
cast --rpc-url $BASE_SEPOLIA_RPC_URL --private-key $PRIVATE_KEY --contract $GOVERNOR_ADDRESS_BASE --method allocateVotes --args "0x3DA8D322CB2435dA26E9C9fEE670f9fB7Fe74E49 100"