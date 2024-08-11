import React from "react";
import { ApprovedProjectData } from "../../types";

const ApprovedCard = (project: ApprovedProjectData) => {
  return (
    <div className="max-w-md p-6 bg-white rounded-lg shadow-lg text-gray-800">
      <h2 className="text-2xl font-bold">{project.name}</h2>
      <p className="mt-2">{project.description}</p>
      <p className="mt-4 font-semibold">{project.moneyRaised} USDC Raised</p>
      <div className="mt-6 flex justify-between">
        <button className="px-4 py-2 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700">
          View
        </button>
        <button className="px-4 py-2 bg-green-600 text-white rounded-full font-semibold hover:bg-green-700">
          Approved
        </button>
      </div>
    </div>
  );
};

export default ApprovedCard;
