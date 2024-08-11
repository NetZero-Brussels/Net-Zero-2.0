import React, { useState } from "react";
import { AllocationUser } from "../../types";

const UserList = ({ users }: { users: AllocationUser[] }) => {
  const [selectedUser, setSelectedUser] = useState<AllocationUser | null>(null);
  const [votes, setVotes] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const openModal = (user: AllocationUser) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedUser(null);
    setVotes("");
    setIsModalOpen(false);
  };

  const handleVoteSubmit = () => {
    if (selectedUser) {
      // Implement the logic to send the transaction here
      console.log(`Assigning ${votes} votes to ${selectedUser.name}`);
    }
    closeModal();
  };

  return (
    <div className="p-4 mb-2 ">
      <ul className="space-y-2 text-black">
        {users.map((user) => (
          <li
            key={user.id}
            className="flex justify-between items-center p-2 w-full bg-gray-100 rounded-lg"
          >
            <span>
              {user.name} - {user.points} points
            </span>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              onClick={() => openModal(user)}
            >
              Assign Votes
            </button>
          </li>
        ))}
      </ul>

      {isModalOpen && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4 text-black">
              Assign Votes to {selectedUser.name}
            </h2>
            <input
              type="number"
              value={votes}
              onChange={(e) => setVotes(e.target.value)}
              className="border p-2 w-full mb-4"
              placeholder="Enter number of votes"
            />
            <div className="flex justify-end space-x-4">
              <button
                className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
                onClick={closeModal}
              >
                Cancel
              </button>
              <button
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                onClick={handleVoteSubmit}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserList;
