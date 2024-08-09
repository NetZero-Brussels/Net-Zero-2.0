require('dotenv').config();
const express = require('express');
const { ethers } = require('ethers');

const app = express();
const PORT = process.env.PORT || 3000;

const provider = new ethers.providers.JsonRpcProvider(process.env.INFURA_URL);
const contractAddress = process.env.CONTRACT_ADDRESS;
const contractABI = [
  "function getReputation(address user) external view returns (uint256)",
  "function getUsers() external view returns (address[] memory)"
]; 

const reputationContract = new ethers.Contract(contractAddress, contractABI, provider);

async function fetchReputation(user) {
  try {
    const reputation = await reputationContract.getReputation(user);
    return { address: user, reputation: reputation.toNumber() };
  } catch (error) {
    console.error(`Failed to fetch reputation for ${user}:`, error);
    return { address: user, reputation: 0 };
  }
}

async function fetchUsers() {
  try {
    const users = await reputationContract.getUsers();
    return users;
  } catch (error) {
    console.error('Failed to fetch users:', error);
    return [];
  }
}

app.get('/leaderboard', async (req, res) => {
  try {
    const users = await fetchUsers();
    const leaderboard = await Promise.all(users.map(fetchReputation));
    leaderboard.sort((a, b) => b.reputation - a.reputation);
    res.json(leaderboard);
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    res.status(500).send('Error fetching leaderboard.');
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
