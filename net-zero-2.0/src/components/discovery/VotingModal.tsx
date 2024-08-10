import React, { useState } from "react";
import { WorldButton } from "../WorldButton";

const VotingModal = ({ isOpen, onClose, onSubmit, projectId }: any) => {
  const [voteCount, setVoteCount] = useState("");

  const handleSubmit = (e: any) => {
    e.preventDefault();
    onSubmit(voteCount);
    setVoteCount("");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4">Enter Vote Count</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="number"
            min="1"
            value={voteCount}
            onChange={(e) => setVoteCount(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mb-4"
            placeholder="Number of votes"
            required
          />
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 text-gray-800 rounded mr-2"
            >
              Cancel
            </button>

            <WorldButton
              projectId={Number(projectId)}
              voteCount={Number(voteCount)}
            >
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded"
              >
                Submit
              </button>
            </WorldButton>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VotingModal;
