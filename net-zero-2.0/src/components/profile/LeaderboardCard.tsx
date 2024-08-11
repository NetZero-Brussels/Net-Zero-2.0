import react from "react";
import LeaderboardSelect from "./TeamSelect";

export default function LeaderboardCard() {
  return (
    <div className="mx-[10%] mt-7 mb-20">
      <div className="flex flex-row mb-4 justify-between items-center">
        <h1 className="text-[28px] font-semibold leading-[32px] text-center ">
          LeaderBoard
        </h1>
      </div>
      <LeaderboardSelect />
    </div>
  );
}
