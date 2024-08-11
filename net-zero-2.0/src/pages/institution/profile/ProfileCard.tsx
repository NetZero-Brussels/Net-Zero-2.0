import React from "react";
import score from "../../../public/score.svg";
import check from "../../../public/check.svg";
import donate from "../../../public/donate.svg";

interface CompanyData {
  name: string;
  email?: string; // Optional field
  reputationScore: number;
  totalVotes: number;
  successfulVotes: number;
  accuracy: number;
}

// Sample data for demonstration
const TestCompany = {
  name: "Apple Inc.",
  email: "applecarbon@apple.com",
  reputationScore: 10384,
  totalVotes: 150,
  successfulVotes: 120,
  accuracy: 80,
};

export default function IProfileCard({
  company = TestCompany,
}: {
  company?: CompanyData;
}) {
  return (
    <div className="mt-7 max-w-sm mx-auto bg-white shadow-lg rounded-lg overflow-hidden p-4  mb-6">
      <div className="flex justify-between items-center p-4">
        <h2 className="text-xl font-semibold">{company.name}</h2>
        <button className="text-blue-500 hover:text-blue-700 outline p-3">
          Share to Farcaster
        </button>
      </div>
      <div className="flex items-center px-4 pb-4">
        <img
          className="w-16 h-16 rounded-full mr-4"
          src="https://via.placeholder.com/150"
          alt="Profile"
        />
        <div>
          <p className="text-gray-700">{company.name}</p>
          {company.email && <p className="text-gray-500">{company.email}</p>}
        </div>
      </div>
      <div className="border-t border-gray-200"></div>
      <div className="px-4 pt-4">
        <div className="flex items-center mb-2">
          <img src={score} alt="Inventory" className="w-6 h-6 mr-2" />
          <p className="text-gray-700">
            Reputation Score: {company.reputationScore} Points
          </p>
        </div>
        <div className="flex items-center mb-2">
          <img src={donate} alt="Inventory" className="w-6 h-6 mr-2" />
          <p className="text-gray-700">
            Total Donations: {company.totalVotes} USDC
          </p>
        </div>
        <div className="flex items-center mb-2">
          <img src={check} alt="Inventory" className="w-6 h-6 mr-2" />
          <p className="text-gray-700">
            Successful Funded Projects: {company.successfulVotes}
          </p>
        </div>
      </div>
    </div>
  );
}
