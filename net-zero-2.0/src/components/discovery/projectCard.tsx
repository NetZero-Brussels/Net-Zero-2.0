import React, { useState, useEffect } from "react";
import { VotingCardData } from "../../types";

const VotingCard = (projectCard: VotingCardData) => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  function calculateTimeLeft(): {
    hours: number;
    minutes: number;
    seconds: number;
  } {
    const difference =
      new Date(projectCard.endTime).getTime() - new Date().getTime();
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
    <div className="max-w-sm p-4 rounded-lg shadow-lg bg-gradient-to-r from-[#9A72EC] to-[#773DEE] text-white">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold">{projectCard.name}</h2>
          <p className="mt-2">{projectCard.description}</p>
          <p className="mt-2">{projectCard.participants}</p>
          <div className="mt-4">
            {timeLeft.hours !== undefined ? (
              <span>
                {formatTime(timeLeft.hours)}:{formatTime(timeLeft.minutes)}:
                {formatTime(timeLeft.seconds)}
              </span>
            ) : (
              <span>Voting Ended</span>
            )}
          </div>
        </div>
        <button className="ml-4 px-4 py-2 bg-white text-[#773DEE] rounded-full font-semibold hover:bg-gray-200">
          Vote
        </button>
      </div>
    </div>
  );
};

export default VotingCard;
