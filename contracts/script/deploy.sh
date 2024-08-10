
source ../.env
forge script script/NetZeroGovener.s.sol:NetZeroGovenerScript --rpc-url $BASE_SEPOLIA_RPC_URL --etherscan-api-key $ETHERSCAN_API_KEY --verify --verifier-url $VERIFY_URL --broadcast --private-key $PRIVATE_KEY
forge script script/NetZeroGovener.s.sol:NetZeroGovenerScript --rpc-url $BASE_SEPOLIA_RPC_URL --etherscan-api-key $ETHERSCAN_API_KEY --verify --broadcast --private-key $PRIVATE_KEY
forge script script/NetZeroGovener.s.sol:NetZeroGovenerScript --rpc-url $BASE_SEPOLIA_RPC_URL --etherscan-api-key $ETHERSCAN_API_KEY --verify --broadcast --private-key $PRIVATE_KEY

forge script script/PopulateDao.s.sol:PopulateDaoScript --rpc-url $RPC_URL --broadcast --private-key $PRIVATE_KEY
forge script script/PopulateDao.s.sol:PopulateDaoScript --rpc-url $BASE_SEPOLIA_RPC_URL --broadcast --private-key $PRIVATE_KEY