import React from "react";
import inventory from "../../../public/inventory.svg";
import score from "../../../public/score.svg";
import successful from "../../../public/successful.svg";
import votes from "../../../public/votes.svg";

interface UserData {
  username: string;
  email?: string; // Optional field
  reputationScore: number;
  totalVotes: number;
  successfulVotes: number;
  accuracy: number;
}

// Sample data for demonstration
const userData = {
  username: "John Doe",
  email: "johndoe@example.com",
  reputationScore: 1200,
  totalVotes: 150,
  successfulVotes: 120,
  accuracy: 80,
};

export default function UserProfileCard({
  user = userData,
}: {
  user?: UserData;
}) {
  return (
    <div className="mt-7 max-w-sm mx-auto bg-white shadow-lg rounded-lg overflow-hidden p-4">
      <div className="flex justify-between items-center p-4">
        <h2 className="text-xl font-semibold">{user.username}</h2>
        <button className="text-blue-500 hover:text-blue-700 outline p-3">
          Share to Farcaster
        </button>
      </div>
      <div className="flex items-center p-4">
        <img
          className="w-16 h-16 rounded-full mr-4"
          src="https://via.placeholder.com/150"
          alt="Profile"
        />
        <div>
          <p className="text-gray-700">{user.username}</p>
          {user.email && <p className="text-gray-500">{user.email}</p>}
        </div>
      </div>
      <div className="border-t border-gray-200"></div>
      <div className="p-4">
        <div className="flex items-center mb-2">
          <img src={score} alt="Inventory" className="w-6 h-6 mr-2" />
          <p className="text-gray-700">
            Reputation Score: {user.reputationScore} Points
          </p>
        </div>
        <div className="flex items-center mb-2">
          <img src={votes} alt="Inventory" className="w-6 h-6 mr-2" />
          <p className="text-gray-700">
            Total Votes Used: {user.totalVotes} Votes
          </p>
        </div>
        <div className="flex items-center mb-2">
          <img src={successful} alt="Inventory" className="w-6 h-6 mr-2" />
          <p className="text-gray-700">
            Successful Votes: {user.successfulVotes} Votes
          </p>
        </div>
        <div className="flex items-center">
          <img src={inventory} alt="Inventory" className="w-6 h-6 mr-2" />
          <p className="text-gray-700">% Accuracy: {user.accuracy}%</p>
        </div>
      </div>
    </div>
  );
}
