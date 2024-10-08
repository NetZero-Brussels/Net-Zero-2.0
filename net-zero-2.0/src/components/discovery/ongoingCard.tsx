import React, { useState, useEffect } from "react";
import { ProjectCardData } from "../../types";
import VotingModal from "./VotingModal";
import DetailModal from "./DetailModal";
import WorldIDTest from "../WorldIDTest";

const OngoingCard = (project: ProjectCardData) => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  //Detail
  const openDetailModal = () => setIsDetailModalOpen(true);
  const closeDetailModal = () => setIsDetailModalOpen(false);

  //Vote
  const handleVoteClick = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleVoteSubmit = (voteCount: number) => {
    console.log(`Voted with ${voteCount} votes for ${project.projectName}`);
    // Here you can add logic to handle the vote submission, e.g., API call
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  function calculateTimeLeft() {
    const difference =
      new Date(project.endTime).getTime() - new Date().getTime();

    let timeLeft = {
      hours: 0,
      minutes: 0,
      seconds: 0,
    };

    if (difference > 0) {
      timeLeft = {
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  }

  const formatTime = (time: number) => (time < 10 ? `0${time}` : time);

  return (
    <div className="max-w-md p-6 bg-white rounded-lg shadow-lg text-gray-800">
      <h2 className="text-2xl font-bold">
        {project.teamName} - {project.projectName}
      </h2>
      <div className="mt-4 flex items-center">
        <span className="px-3 py-1 bg-gray-200 rounded-full text-sm font-medium">
          {project.location}
        </span>
        <span className="ml-4 text-sm">
          Energy Export: {project.energyExport} kWh/day
        </span>
      </div>
      <div className="mt-4">
        <p>Fund Raise Goal: {project.fundRaiseGoal} USDC</p>
        <p>Current Vote: {project.currentVote}</p>
        <div className="mt-2">
          {timeLeft.hours !== undefined ? (
            <span>
              Vote Ends: {formatTime(timeLeft.hours)}:
              {formatTime(timeLeft.minutes)}:{formatTime(timeLeft.seconds)}
            </span>
          ) : (
            <span>Voting Ended</span>
          )}
        </div>
      </div>
      <div className="mt-4">
        <p className="mb-1">Progress: {project.fundedPercentage}% Funded</p>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className="bg-blue-600 h-2.5 rounded-full"
            style={{ width: `${project.fundedPercentage}%` }}
          ></div>
        </div>
      </div>
      <div className="mt-6 flex justify-between">
        <button
          onClick={openDetailModal}
          className="px-4 py-2 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700"
        >
          View
        </button>
        <button
          onClick={handleVoteClick}
          className="px-4 py-2 bg-green-600 text-white rounded-full font-semibold hover:bg-green-700"
        >
          Vote
        </button>
      </div>
      <VotingModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onSubmit={handleVoteSubmit}
        projectId={project.id}
      />
      <DetailModal
        isOpen={isDetailModalOpen}
        onClose={closeDetailModal}
        project={project}
      />
    </div>
  );
};

export default OngoingCard;
